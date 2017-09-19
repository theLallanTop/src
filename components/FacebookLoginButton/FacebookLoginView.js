import React, { PropTypes, Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Fonts, Images, Colors } from '../../theme';

import styles from './FacebookLoginViewStyle';
import { loginWithSocial } from '../../redux/modules/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from 'react-native-fbsdk'

export default class FacebookLoginView extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  loginWithfacebook = () => {
    AccessToken
      .getCurrentAccessToken()
      .then( data => {
        const  accessToken = data.accessToken;
        console.log('accesstoken', accessToken);
        const responseInfoCallback = async ( errorResponse, resultResponse) => {
          const userDetails = JSON.parse(JSON.stringify(resultResponse));
          console.log('userdetails', userDetails);
          const { store: { dispatch }} = this.context;
          dispatch(loginWithSocial({
            username: userDetails.email,
            token: accessToken,
            firstName:userDetails.first_name,
            lastName:userDetails.last_name,
            provider: 'facebook',
            imageUrl: userDetails.picture.data.url
          }));
        };
        const infoRequest = new GraphRequest (
          '/me',
          {
            accessToken,
            parameters: {
              fields: {
                string: 'email,first_name,middle_name,last_name,picture'
              }
            }
          },
          responseInfoCallback
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      })
      .catch(ex => console.error('*ERROR ON GET ACCESS TOKEN', ex));
  };


  onFacebookLogIn = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Cancel');
        } else {
          console.log('Login success with permissions: ', result);
          this.loginWithfacebook();
        }
      },
      (error) => {
        console.log('Login fail with error: ', error);
      }
    );
  }

  render() {
    return (
      <TouchableOpacity style={styles.fbLoginButtonStyle} onPress={this.onFacebookLogIn}>
        <View style={styles.fbLoginViewStyle}>
          <View style={styles.fbIconViewStyle}>
            <Image resizeMode="contain" style={{ height: 26, width: 26 }} source={Images.facebookicon} />
          </View>
          <View style={styles.fbTextViewStyle}>
            <Text style={styles.fbLoginbuttonTexStyle}>Facebook</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
