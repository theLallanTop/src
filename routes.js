import React, { Component, PropTypes } from 'react';
import { Home, IntroSwipe, SignUp, Login, Playerview } from './containers';
import SplashScreen from 'react-native-smart-splash-screen';
import {
  TopStories,
  CategoriesItemListview,
  StoryListView,
  WishListView,
  ProfileEditView,
  StoryQueueView,
  SearchBarView,
  MyPlan,
  Info,
  AboutUs,
  CCAvenueWebView,
} from './containers';

import { RatingView, BankListName, ViewAllShow } from './components';
import { Text, View, Platform, TouchableOpacity, Image, Alert, BackAndroid, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Images, Fonts } from './theme';
import NavigationDrawer from './NavigationDrawer';

import { Router, Scene, Actions as NavigationActions } from 'react-native-router-flux';
import { Badge, Icon } from 'native-base';
import { login, loginWithSocial } from './redux/modules/auth';


const Styles = {
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: Colors.BaseColor,
    borderBottomWidth: 0,
  },
  dashboardNavBar: {
    flex:1,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.snow
  },
  leftButton: {
    tintColor: Colors.transparent
  },
  rightButton: {
    color: Colors.snow
  },
  navTitle: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownOptions: {
    marginTop: 33,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 60,
    height: 30
  },
  logout: {
    color: Colors.white,
    marginLeft: -10,
    marginTop: -5
  },
  renderTitleStyle: {
    alignSelf: 'center',
    width: null,
    ...Platform.select({
      ios: {
        top: 24,
      },
      android: {
        top: 14,
      },
    }),
    right: 0,
  },
  rightButtonView: {
    flexDirection: 'row',
    width: 70,
    height: 37,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 0,
      },
      android: {
        top: 0,
      },
    }),
    right: 2,
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 8,
      },
    }),
  },
  rightButtonStyle: {
    height: 25,
    width: 30,
    marginLeft: 5,
  },
  badgeStyle: {
    marginTop: -12,
    marginLeft: -17,
    width: 23,
    height: 23,
    backgroundColor: Colors.skyColor,
    borderWidth: 0.5,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeTextStyle: {
    fontSize: Fonts.size.tiny,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.white,
    marginLeft: 0,
  },
  titleTextStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.Walkthrough.medium
  },
  customLeftBtnStyle: {
    width: 20,
    height: 15,
    resizeMode: 'contain',
  },
};

class AppRouter extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  async componentDidMount () {
    try {
      const userCredential = await AsyncStorage.getItem('userData');
      const savedUserParams = JSON.parse(userCredential);
      if(!savedUserParams){
        // console.log('*********************************** close');
        SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
        });
        NavActions.intro();
      }else {
        const password = savedUserParams.password;
        // console.log('SavedUser password : ',password);
        const {store: {dispatch}} = this.context;
        if(password === undefined) {
          dispatch(loginWithSocial(savedUserParams))
        } else {
          dispatch(login(savedUserParams))
        }
      }
    } catch (err) {
        // console.log('data save error', err);
    }
  }

  render() {
    return (
      <Router
        navigationBarStyle={Styles.navBar}
        titleStyle={Styles.titleTextStyle}
        drawerImage={Images.navSideMenuBarIcon}
        hideNavBar={false}
        onExitApp={onExitApp}
        backButtonImage={Images.navigationbackbuttonicon}
      >
        <Scene key="intro" component={IntroSwipe} hideNavBar={true} type="replace"/>
        <Scene key="drawer" component={NavigationDrawer} type="replace" >
          <Scene key="drawerChildrenWrapper" >
            <Scene key="home" component={Home} refresh={true}
                   renderTitle={() =>
                        <View style={Styles.renderTitleStyle}>
                           <Text style={Styles.titleTextStyle}>Fir kya hua </ Text>
                        </View>
                   }
                  hideNavBar={false}
                  renderRightButton={() =>
                        <View style={Styles.rightButtonView}>
                            <TouchableOpacity style={{ height: 25, width: 30, marginLeft: -10 }} onPress={() => NavigationActions.searchbarview()}>
                              <View style={{ alignItems: 'center', justifyContent:'center'}}>
                                 <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.searchicon} />
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.rightButtonStyle}  onPress={() => console.log('hello')}>
                              <View style={{ alignItems: 'center', justifyContent:'center'}}>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.notificationicon} />
                              </View>
                            </TouchableOpacity>
                        </View>
                  }
            />
            <Scene key="myPlan" component={MyPlan} renderTitle={() =>
                  <View style={Styles.renderTitleStyle}>
                      <Text style={Styles.titleTextStyle}>Your Subscription Plan</ Text>
                  </View>
               } hideNavBar={false} leftButtonIconStyle = {Styles.customLeftBtnStyle}/>

            <Scene key="profileeditview"
                   renderTitle={() =>
                      <View style={Styles.renderTitleStyle}>
                         <Text style={Styles.titleTextStyle}>Edit Profile</ Text>
                      </View>
                   }
                   component={ProfileEditView}
                   hideNavBar={false}
                   leftButtonIconStyle = {Styles.customLeftBtnStyle}
            />
          </Scene>
        </Scene>
        <Scene key="info" component={Info} hideNavBar={true} />

        <Scene key="signUp" component={SignUp} hideNavBar={true} />
        <Scene key="login" component={Login} hideNavBar={true} />
        <Scene key="topstories" component={TopStories} hideNavBar={true}/>
        <Scene key="web" component={CCAvenueWebView} hideNavBar={true}  type="replace" />

        <Scene key="playerview" component={Playerview} hideNavBar={true} direction="vertical"/>
        <Scene key="categoriesitemlist" component={CategoriesItemListview} hideNavBar={true}/>

        <Scene key="storylistview"
               renderTitle={() =>
                  <View style={Styles.renderTitleStyle}>
                      <Text style={Styles.titleTextStyle}>Subscribe</ Text>
                  </View>
               }
               component={StoryListView}
               hideNavBar={false}
               leftButtonIconStyle = {{ width: 20, height: 15, resizeMode: 'contain'}}
        />
        <Scene key="wishlist"
               renderTitle={() =>
                  <View style={Styles.renderTitleStyle}>
                    <Text style={Styles.titleTextStyle}>My Like</ Text>
                  </View>
               }
               component={WishListView}
               hideNavBar={false}
               leftButtonIconStyle = {Styles.customLeftBtnStyle}
        />
        <Scene key="bankListName"
               renderTitle={() =>
                  <View style={Styles.renderTitleStyle}>
                     <Text style={Styles.titleTextStyle}>Select your bank</ Text>
                  </View>
               }
               component={BankListName}
               hideNavBar={false}
               leftButtonIconStyle = {{ width: 20, height: 15, resizeMode: 'contain'}}
        />

        <Scene key="viewallshow"
               renderTitle={() =>
                  <View style={Styles.renderTitleStyle}>
                     <Text style={Styles.titleTextStyle}>View All</ Text>
                  </View>
               }
               component={ViewAllShow}
               hideNavBar={false}
               leftButtonIconStyle = {{ width: 20, height: 15, resizeMode: 'contain'}}
        />

        <Scene key="searchbarview" component={SearchBarView} hideNavBar={true} />
        <Scene key="aboutus" title="About Us" component={AboutUs} hideNavBar={false} leftButtonIconStyle = {Styles.customLeftBtnStyle}/>
        <Scene key="queueList" renderTitle={() =>
                <View style={Styles.renderTitleStyle}>
                  <Text style={Styles.titleTextStyle}>Story Queue</ Text>
                </View>
              } component={StoryQueueView} hideNavBar={false} leftButtonIconStyle = {Styles.customLeftBtnStyle} direction="vertical" />
        <Scene key="ratingview" title="Rating" component={RatingView} hideNavBar={false} leftButtonIconStyle = {Styles.customLeftBtnStyle} direction="vertical" />
      </Router>
    );
  }
}

export default connect(state =>({
  wishListData: state.wishlist.wishListData,
}))(AppRouter)

const onExitApp = () => {
  Alert.alert(
    'Fir kya hua',
    'Are you sure you want to exit this app ?',
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Ok', onPress: () => BackAndroid.exitApp() },
    ]
  );
  return true;
};

/*  wishlist view
* <TouchableOpacity style={Styles.rightButtonStyle} onPress={() => NavigationActions.wishlist()}>
 <View style={{ alignItems: 'center', justifyContent:'center'}}>
 <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.wishlisticon} />
 </View>
 </TouchableOpacity>
 { this.props.wishListData !== null && this.props.wishListData.length > 0 &&
 <Badge style={Styles.badgeStyle}>
 <Text style={Styles.badgeTextStyle}>
 {this.props.wishListData.length}
 </Text>
 </Badge>
 }
 */