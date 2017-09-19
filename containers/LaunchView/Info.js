import React, { Component, PropTypes } from 'react';
import { View, Image, StatusBar, AsyncStorage, Text } from 'react-native';
import { Colors, Images, Metrics } from '../../theme';
import { Actions as NavActions } from 'react-native-router-flux';
import { login, loginWithSocial } from '../../redux/modules/auth';
import { IntroSwipe, Home } from '../../containers';
import SplashScreen from 'react-native-smart-splash-screen';


export default class Info extends Component {

  constructor() {
    super();
    this.state = {
      isLogin: false
    };
  }

  static contextTypes = {
    store: PropTypes.object
  };


  async componentDidMount () {
    try {
      const userCredential = await AsyncStorage.getItem('userData');
      const savedUserParams = JSON.parse(userCredential);
      if(!savedUserParams){
        NavActions.intro();
      }else {
        const password = savedUserParams.password;
        console.log('SavedUser password : ',password);
        const {store: {dispatch}} = this.context;
        if(password === undefined) {
          dispatch(loginWithSocial(savedUserParams))
        } else {
          dispatch(login(savedUserParams))
        }
      }
    } catch (err) {
    }

    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    })
  }


  // async componentWillMount () {
  //   console.log('componentWillMount');
  //
  // }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ height: Metrics.screenHeight, width: Metrics.screenWidth, resizeMode: 'cover' }} source={Images.launchicon} />
      </View>
    )
  }
}

