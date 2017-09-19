import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Colors } from '../../theme';
import { Row, Col, Icon } from 'native-base';
import styles from './TopStoriesRowStyle';
import { Actions as NavActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addToWishList, deletefromWishlist } from '../../redux/modules/wishlist';
import { likeStory } from '../../redux/modules/myStories';
import { updateDownloadStoryStatus } from '../../redux/modules/stories';
import SnackBar from 'react-native-snackbar-dialog';
import { getDownLoadStatus, downLoadStory, checkIfStoryExists } from '../../helpers/Download';
import { selectStory } from '../../redux/modules/storyPlayer';

class TopStoriesRow extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isDone: true,
      isDownload: false
    };
  }

  static contextTypes = {
    store: PropTypes.object
  };

  static propTypes = {
    topstorieslistrow: PropTypes.any,
    myLikeResponded: PropTypes.any,
    rowID: PropTypes.any,
    myProfile: PropTypes.any,
    myStories: PropTypes.any,
    myWishList: PropTypes.any,
    isWishList: PropTypes.any,
  };

  onPressPlayButton = () => {

    const { store: { dispatch }} = this.context;
      this.setState({
        isDownload: true
      });
      new Promise((resolve, reject) => {
        dispatch(checkIfStoryExists(dispatch, this.props.topstorieslistrow))
          .then((res) => {
            this.setState({
              isDownload: false
            });
            dispatch(selectStory(this.props.topstorieslistrow, false, null, -1));
            NavActions.playerview({ isNext: true });
            resolve();
          })
          .catch((error) => {
            console.log('Error in downloading');
            this.setState({
              isDownload: false
            });
            reject()
          })
      });
    };


  onPressMyLikeButton = () => {
    new Promise((resolve, reject) => {
      const { store: { dispatch } } = this.context;
      dispatch(likeStory(this.props.topstorieslistrow))
        .then((res) => {

        })
        .catch((error) => {

        })
    });
  };



  onPressFavouriteButton = () => {
    // const story = this.props.topstorieslistrow;
    const { myProfile, myWishList, topstorieslistrow } = this.props;
    console.log('myprofile, mywishlist, topstorieslistrow ', myProfile, myWishList, topstorieslistrow);
    if(myProfile.profile) {
      new Promise((resolve, reject) => {
        const { store: { dispatch } } = this.context;
        let isWishListIdExist = myWishList.filter((story) => story.storyId === topstorieslistrow.storyId);
        if(isWishListIdExist.length === 0) {
          dispatch(addToWishList(topstorieslistrow))
            .then((res) => {
              // SnackBar.show('Story added to your wishlist', {
              //   style: { marginBottom: 20 },
              //   backgroundColor: Colors.snackBarColor,
              //   textColor: Colors.white,
              // });
              resolve()
            })
            .catch((error) =>  {
              console.log("Error");
              reject();
            })
        } else {
          dispatch(deletefromWishlist(topstorieslistrow))
            .then((res) => {
              // SnackBar.show('Story deleted from your wishlist', {
              //   style: { marginBottom: 20 },
              //   backgroundColor: Colors.snackBarColor,
              //   textColor: Colors.white,
              // });
              resolve();
            })
            .catch((error) =>  {
              console.log("Error from deleted");
              reject();
            })
        }

      });
    }
    else {
      SnackBar.show('Please Login to add the story in wishlist', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      })
    }
  };

  updateDownloadStatus = () => {
    const { store: { dispatch } } = this.context;
    const { topstorieslistrow, myProfile, isWishList } = this.props;
    new Promise((resolve, reject) => {
      dispatch(downLoadStory(dispatch, topstorieslistrow, isWishList))
        .then((res) => {
          console.log('Download res');
          this.setState({ isDone: true });
        })
        .catch((error) => {
          console.log('Download reject');
          this.setState({ isDone: true });
        })
    })
  };

  downLoadtheStory = () => {
     const { store: { dispatch } } = this.context;
     const { topstorieslistrow, myProfile, isWishList } = this.props;
     if (myProfile.profile) {
       new Promise((resolve, reject) => {
         if(topstorieslistrow.isFree === 0) {
           dispatch(getDownLoadStatus(dispatch, topstorieslistrow))
             .then((res) => {
               let message = '';
               if (res.statusCode === 1) {

                 this.updateDownloadStatus();
                 this.setState({ isDone: true });

               } else if (res.statusCode === 2) {

                 message = 'To download the story, please subscribe first';
                 SnackBar.show(message, {
                   style: { marginBottom: 20 },
                   backgroundColor: Colors.snackBarColor,
                   textColor: Colors.white
                 });
                 this.setState({ isDone: true });

               } else if (res.statusCode === 3) {

                 message = 'Your subscription has been expired. Please renew your subscription.';
                 SnackBar.show(message, {
                   style: { marginBottom: 20 },
                   backgroundColor: Colors.snackBarColor,
                   textColor: Colors.white
                 });
                 this.setState({ isDone: true });

               } else if (res.statusCode === 4) {
                 this.setState({ isDone: true });
                 message = 'Something went wrong please try after sometime'
                 SnackBar.show(message, {
                   style: { marginBottom: 20 },
                   backgroundColor: Colors.snackBarColor,
                   textColor: Colors.white
                 });

               }

             })
             .catch((error) => {
               console.log('error : ', error)
             })
         } else {
           this.updateDownloadStatus()
         }
       });

     }
   };



  onPressDownloadButton = () => {
    const { topstorieslistrow, myProfile } = this.props;
    // if(myProfile.isSwitchOn){
    //   SnackBar.show('Downloading feature is unavailable in Child mode. Please disable child mode.', {
    //     style: { marginBottom: 20 },
    //     backgroundColor: Colors.snackBarColor,
    //     textColor: Colors.white
    //   })
    // }else {
      if (myProfile.profile) {
        this.setState({ isDone: false });
        this.downLoadtheStory()
      } else {
        SnackBar.show('Downloading feature is unavailable for Guest User. Please Login to use this feature.', {
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        })
      }
    // }
  };

  render() {

    const { myProfile, topstorieslistrow, myWishList, myLikeResponded } = this.props;
    console.log('Top stories list row', myLikeResponded);
    let isWishListIdExist = [];
    if(myProfile.profile) {
      isWishListIdExist = myLikeResponded.filter((story) => story.storyId === topstorieslistrow.storyId);
    }

    const rate = [];
    for(let i = 0; i < 5; i++){
      if( i < topstorieslistrow.rating){
        rate.push(
          <View key = {i}>
            <View style={{ justifyContent: 'space-between' }}>
              <Icon name='md-star' style={{color: '#F4BF27', fontSize: 18, marginLeft: 4, marginTop: 3 }} />
            </View>
          </View>
        )
      }else {
        rate.push(
          <View key={i}>
            <View style={{ justifyContent: 'space-between' }}>
              <Icon name='ios-star-outline' style={{color: '#FFE501', fontSize: 18, marginLeft: 4, marginTop: 3 }} />
            </View>
          </View>
        )
      }
    }

    return(
      <View style={styles.mainTopStoriesRowStyle}>
        <Row style={styles.rowViewStyle}>
          <Col style={styles.colListViewStyle}>
            <Row>
              <Text>{this.props.topstorieslistrow.title}</Text>
            </Row>
            <Row>
              { rate }
            </Row>
          </Col>
          {this.props.myLike === 'My Likes' &&
            <Col style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                underlayColor={Colors.cloud}
                style={{ height: 24, width: 30, justifyContent: 'center' }}
                onPress={this.onPressMyLikeButton}>
                <Icon name='md-heart'
                      style={{color: isWishListIdExist.length === 1 ? Colors.BaseColor : Colors.charcoallight, fontSize: 20}}/>
              </TouchableOpacity>
            </Col>
          }
          <Col style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={{ height: 24, width: 30, justifyContent: 'center' }}
              onPress={(topstorieslistrow.downloadedStoryId === null) ? this.onPressDownloadButton : this.onPressPlayButton }>
              {this.state.isDone ? <Icon
                name={topstorieslistrow.downloadedStoryId === null ? 'md-download' : 'md-play' }
                style={
                  topstorieslistrow.downloadedStoryId === null ?
                  {
                    color: Colors.charcoallight,
                    fontSize: 20
                  } :
                  {
                    color: Colors.BaseColor,
                    fontSize: 20
                  }
                }
              />
                :
                <ActivityIndicator
                  color={Colors.BaseColor}
                  size='small'
                  style={{ flex: 1 }}
                  animating={!this.state.isDone}
                />
              }
            </TouchableOpacity>
          </Col>
        </Row>
      </View>
    );
  }
}

export default connect(state => ({
  myProfile: state.profile,
  myStories: state.myStories,
  myLikeResponded: state.myStories.myLikeResponded,
}))(TopStoriesRow)
