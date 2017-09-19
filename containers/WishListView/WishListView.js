import React, { Component , PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import { Actions as NavActions } from 'react-native-router-flux';
import styles from './WishListViewStyle';
import { Container, Content, List, ListItem, Col, Row } from 'native-base';
import { connect } from 'react-redux'
import { TopStoriesRow } from '../../components';
import { getWishList } from '../../redux/modules/wishlist';
import { DialogView } from '../../components';
import { getDownLoadStatus, downLoadStory } from '../../helpers/Download';
import Spinner from 'react-native-loading-spinner-overlay';
import SnackBar from 'react-native-snackbar-dialog';

class WishListView extends Component {

  constructor() {
    super();
    this.state = {
      isDownload: false,
      data: null
    };
  }

  static contextTypes = {
    store: PropTypes.object
  };

  static propTypes = {
    myWishList: PropTypes.any,
    myProfile: PropTypes.any,
  };

  onPressStartAdding = () => {
    NavActions.pop()
  };

  startDownloading = (index, stories, isFree) => {

    console.log('index : stories , isFree', index,stories,isFree)

    if(index < 0 && isFree === false) {
      this.setState({isDownload: false});
      return
    }

    if(index < 0 && isFree === true) {
      console.log('start download for paid stories');
      this.downloadPaidStories();
      return
    }
    const { store: { dispatch }} = this.context;
    new Promise((resolve, reject) =>{
      dispatch(downLoadStory(dispatch, stories[index], true))
        .then((resolve, reject) => {
          return (this.startDownloading(index-1, stories, isFree))
        })
        .catch((error) => {

        })
    });

  };

  downloadPaidStories = () => {
    const { store: { dispatch }} = this.context;
    const { myWishList, myProfile } = this.props;
    new Promise((resolve, reject) => {

      dispatch(getDownLoadStatus(dispatch))
        .then((res) => {
          console.log('res : ',res);
          let message = '';
          if(res.statusCode === 1) {
            let storyForDownload = myWishList.filter((story) => story.downloadedStoryId === null);
            console.log('storyForDownload : ', storyForDownload);
            if(res.remainingCount >= storyForDownload.length){
              console.log('recursive call ');
              this.startDownloading(storyForDownload.length-1, storyForDownload, false);
            } else if(res.remainingCount < storyForDownload.length) {
              message = "Insufficient balance";
              this.refs.dialogView.showDialog(message, true)
            }

          } else if(res.statusCode === 2) {
            this.setState({isDownload: false});
            message = 'To download the story, please subscribe first';
            this.refs.dialogView.showDialog(message, true)

          } else if(res.statusCode === 3) {

            message = 'Your subscription has been expired. Please renew your subscription.';
            this.setState({isDownload: false});
            this.refs.dialogView.showDialog(message, true)

          } else if(res.statusCode === 4){
            this.setState({isDownload: false});
            message = 'Something went wrong please try after sometime';
            this.refs.dialogView.showDialog(message, true)
          }
        })
        .catch((error) => {

        })
    });
  };

  onPressdownloadAll = ()  => {
    const { myWishList, myProfile } = this.props;

    if(myProfile.profile) {
      this.setState({isDownload: true});
      let freeStories = myWishList.filter((story) => story.isFree === 1);
      if(freeStories.length > 0) {
        this.startDownloading(freeStories.length - 1, freeStories, true)
      } else {
        this.downloadPaidStories();
      }
    } else {
      SnackBar.show('Downloading feature is unavailable for Guest User. Please Login to use this feature.', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      })
    }
  };

  componentDidMount() {
    const { store: { dispatch }} = this.context;
    dispatch(getWishList());
  }

  render() {
    const { myWishList, myProfile } = this.props;
    if(myWishList === null || myWishList.length === 0) {
      return (
        <View style={styles.wishlistContainer}>
          <Content>
            <View style={styles.wishlistViewStyle}>
              <View style={styles.iconheartStyle}>
                <Image style={styles.wishlistHeartIconStyle} source={Images.wishlisthearticon}/>
              </View>
              <View style={styles.wishlistTextViewStyle}>
                <Text style={styles.wishlistTextStyle}>
                  No wishlist? Explore and add some stories
                </Text>
              </View>
              <View style={styles.addBtnViewStyle}>
                <TouchableOpacity
                  underlayColor={Colors.transparent}
                  style={styles.storiesTopButtonStyle}
                  onPress={this.onPressStartAdding}>
                  <Text style={styles.addBtnTextStyle}>START ADDING</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </View>
      );
    }else {
      return (
        <View style={styles.wishlistContainer}>
          <Content>
            <Spinner visible={this.state.isDownload} textContent='Downloading...' />
            <View style={{ flex: 1,}}>
              <List
                style={{ backgroundColor: Colors.transparent, flex: 1 }}
                dataArray={myWishList}
                renderRow={(item) => {
                  return(
                     <ListItem style={{ backgroundColor: Colors.white }}>
                       <TopStoriesRow topstorieslistrow={ item } myWishList={this.props.myWishList} isWishList={true} />
                      </ListItem>
              );
                }} />
            </View>
          </Content>

          {!myProfile.isSwitchOn && <View style={styles.downloadAllViewStyle}>
            <TouchableOpacity
              underlayColor={Colors.transparent}
              style={styles.storiesTopButtonStyle}
              onPress={this.onPressdownloadAll}>
              <Text style={styles.downloadAllTextStyle}>DOWNLOAD ALL</Text>
            </TouchableOpacity>
          </View>}
          <DialogView ref="dialogView"/>
        </View>
      );
    }
  }
}

export default connect((state) => ({
  myWishList: state.wishlist.wishListData,
  myProfile: state.profile,
}))(WishListView)



