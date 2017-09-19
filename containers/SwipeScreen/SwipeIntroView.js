import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import Walkthrough from 'react-native-swipe-a-lot';
import styles from './SwipeIntroStyle';
import { Colors, Fonts } from '../../theme';
import { IntroFirstView, IntroSecondView, IntroThirdView } from '../../components';
import { Actions as NavActions } from 'react-native-router-flux';
// import { login, loginWithSocial } from '../../redux/modules/auth';
import myTracker from '../../helpers/myTracker';

export default class SwipeIntroView extends Component {
  constructor() {
    super();
    this.state = {
      isLogin : false,
      connectionInfo: null,
    };
  }

  static contextTypes = {
    store: PropTypes.object
  };

  onPressLoginButton = () => {
    this.setState({ isLogin: true});
    NavActions.login();
  };

  onPressSignUpButton = () => {
    this.setState({ isLogin: false});
    NavActions.signUp();
  };

  onPressSkipButton = () => {

    // const skip = (parseInt(this.swiper.getPage()) + 1);
    // if(skip < 3 ){
    //   this.swiper.swipeToPage(skip)
    // } else {
      NavActions.drawer();
    // }
  };

  // async componentWillMount () {
  //   try {
  //     const userCredential = await AsyncStorage.getItem('userData');
  //     const savedUserParams = JSON.parse(userCredential);
  //     const password = savedUserParams.password;
  //     console.log('SavedUser password : ',password);
  //     const {store: {dispatch}} = this.context;
  //     if(password === undefined) {
  //       dispatch(loginWithSocial(savedUserParams))
  //     } else {
  //       dispatch(login(savedUserParams))
  //     }
  //   } catch (err) {
  //   }
  // }

  render() {
    myTracker.allowIDFA(true);
    myTracker.setAppName('Fir kya hua');
    myTracker.trackScreenView('Walkthrough');
    myTracker.trackEvent('testcategory', 'testaction');
    return (
      <View style={styles.mainSwipeController}>
        <StatusBar hidden={false} backgroundColor={Colors.statusBarColor} barStyle="light-content" />
        <View style={styles.skipViewStyle}>
          <TouchableOpacity
            underlayColor={Colors.cloud}
            style={styles.skipButtonStyle}
            onPress={this.onPressSkipButton}>
            <Text style={styles.skipTextStyle}>SKIP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walkViewStyle}>
          <Walkthrough ref={(c) => this.swiper = c}
                       circleDefaultStyle = {{
              backgroundColor: Colors.cloud,
              height: 12,
              width: 12,
              borderRadius: 6,
              marginTop: 3
            }}
                       circleActiveStyle = {{
              backgroundColor: Colors.BaseColor,
              height: 6,
              marginTop: 6
            }}
          >
            <View style={styles.subSwipeViewStyle}>
              <IntroFirstView />
            </View>
            <View style={styles.subSwipeViewStyle}>
              <IntroSecondView />
            </View>
            <View style={styles.subSwipeViewStyle}>
              <IntroThirdView />
            </View>
          </Walkthrough>
        </View>

        <View style={styles.buttonViewStyle}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={(this.state.isLogin === true ) ? styles.leftSelectedButtonStyle : styles.leftUnselectedButtonStyle }
              onPress={this.onPressLoginButton}>
              <Text style={(this.state.isLogin === true ) ? styles.activeButtonTextStyle : styles.buttonTextStyle }>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={(this.state.isLogin === false ) ? styles.rightSelectedButtonStyle : styles.rightUnselectedButtonStyle }
              onPress={this.onPressSignUpButton}>
              <Text style={(this.state.isLogin === false ) ? styles.activeButtonTextStyle : styles.buttonTextStyle }>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
