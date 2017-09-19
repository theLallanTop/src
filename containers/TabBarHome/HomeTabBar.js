import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, NetInfo } from 'react-native';
import { Colors, Images } from '../../theme';
import styles from './HomeTabBarStyle';
import { NewStoriesListView, CategotiesListView  } from '../../components';
import { Grid, Col, Row, Button, Icon, Container, Content } from 'native-base';
import { Actions as NavActions } from 'react-native-router-flux';
import { getcategorieslist, getnewstorieslist } from '../../redux/modules/homeAuth';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import SnackBar from 'react-native-snackbar-dialog';
import { getmylikelist } from '../../redux/modules/myStories';
import { getWishList } from '../../redux/modules/wishlist';
import config from '../../config/appconfig';
import { getprofiledetails } from '../../redux/modules/profile';
import { getQueueList } from '../../redux/modules/queue';
import { Crashlytics } from 'react-native-fabric';
import myTracker from '../../helpers/myTracker';

class HomeTabBar extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    isLoading: PropTypes.any,
    myProfile: PropTypes.any,
    storyPlayerInfo: PropTypes.any
  };
  static contextTypes = {
    store: PropTypes.object
  };

  showPlayerView = () => {
    NavActions.playerview({ isNext: false });
  };

  componentWillMount() {
    const { store: { dispatch }} = this.context;
    console.log('Config : ', config.AuthToken);
    if(config.AuthToken) {
      new Promise((resolve, reject) =>{
        dispatch(getprofiledetails())
          .then((resolve) => {
            dispatch(getWishList());
            dispatch(getmylikelist());
            dispatch(getQueueList())
          })
          .catch((error) => {

          })
      })
    }
    const { myProfile } = this.props;
    let userId = null;
    if(myProfile.profile) {
      userId = myProfile.profile.id;
    }
    dispatch(getcategorieslist());
    dispatch(getnewstorieslist(userId));
  }

  freeStoresButton = () => {

    // Crashlytics.crash(); //fabric crash ...

    NavActions.topstories({Header:'Free Stories'});
  };
  topStoresButton = () => {
    NavActions.topstories({Header:'Top Stories'});
  };

  ViewAllBtn = () => {
    NavActions.viewallshow()
  };

  // internet connection

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
    console.log('connectionInfo', isConnected);
    if(!this.state.isConnected){
      SnackBar.show('Your internet connection has been lost', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    }
  };

  render() {
    const { storyPlayerInfo } = this.props;
    myTracker.allowIDFA(true);
    myTracker.setAppName('Fir kya hua');
    myTracker.trackScreenView('Home');
    myTracker.trackEvent('testcategory', 'testaction');
    return(
      <Container style={{ flex: 1 }}>
        <Content>
          <StatusBar hidden={false} backgroundColor={Colors.statusBarColor} barStyle="light-content" />
          <Spinner visible={this.props.isLoading} />
          <View style={{ backgroundColor: Colors.homeBackground }}>
            <View style={styles.storiesGridStyle}>
              <Row>
                <Col style={{ marginRight: 5, flex: 1 }}>
                  <Image style={styles.headerImageStyle} source={Images.blueheadericon}>
                    <TouchableOpacity
                      underlayColor={Colors.transparent}
                      style={styles.storiesFreeButtonStyle}
                      onPress={this.freeStoresButton}>
                      <Text style={styles.storiesTextStyle}>FREE{'\n'} STORIES</Text>
                    </TouchableOpacity>
                  </Image>
                </Col>
                <Col style={{ marginLeft: 5, flex: 1 }}>
                  <Image style={styles.headerImageStyle} source={Images.orangeheadericon}>
                    <TouchableOpacity
                      underlayColor={Colors.transparent}
                      style={styles.storiesTopButtonStyle}
                      onPress={this.topStoresButton}>
                      <Text style={styles.storiesTextStyle}>TOP{'\n'} STORIES</Text>
                    </TouchableOpacity>
                  </Image>
                </Col>
              </Row>
            </View>
            <View style={styles.newstoriesViewStyle}>
              <Row>
                <Col style={styles.newStriesGridStyle}>
                  <Text style={styles.TitleTextStyle}>New Stories</Text>
                </Col>
                <Col style={styles.viewAllStyle}>
                  <Button
                    transparent
                    block
                    style={{
                      flex: 0.5,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end'
                    }}
                    onPress={this.ViewAllBtn}>
                    <Text style={styles.viewAllTextStyle}>VIEW ALL</Text>
                  </Button>
                </Col>
              </Row>
            </View>
            <View horizontal = {true} style={{ marginTop: -15 }}>
              <NewStoriesListView />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.TitleTextStyle}>Categories</Text>
            </View>
            <View style={styles.categoriesViewStyle} >
              <CategotiesListView />
            </View>
          </View>
        </Content>
        { storyPlayerInfo.storyPlayed !== null &&
        <TouchableOpacity
          style={styles.playerButton}
          onPress={this.showPlayerView}
        >
          <View style={styles.playerStoryTitleView}>
            <Text style={styles.playerStoryTitleTextStyle}>
              {storyPlayerInfo.storyPlayed.title}
            </Text>
          </View>
          <View style={styles.playerPlayIconView}>
            <Icon name={storyPlayerInfo.isStoryPlaying ? "md-pause" : "md-play"} style={{color: Colors.BaseColor}}/>
          </View>

        </TouchableOpacity>
        }
      </Container>
    )
  }
}

export default connect(state => ({
  isLoading: state.homeAuth.isLoading,
  myProfile: state.profile,
  storyPlayerInfo: state.storyPlayer,
}))(HomeTabBar)