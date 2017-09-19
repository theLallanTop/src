import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'native-base'
import { GoogleSignin } from 'react-native-google-signin'
import styles from './GmailLoginViewStyle'
import { Fonts, Images } from '../../theme';
import { loginWithSocial } from '../../redux/modules/auth'
export default class GmailLoginView extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  googleLogIn = () => {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      console.log('Play services active');
      GoogleSignin.configure({
        iosClientId: '776188680540-h2k0fe07vair8cn31ufcjnvqqsrabaq5.apps.googleusercontent.com',
        // webClientId: '79319771328-sv5geqg2pagb8kv1cr9gh8peb5e70g9a.apps.googleusercontent.com',
      })
        .then(() => {
          GoogleSignin.signIn()
            .then((user) => {
              console.log('user==>> : ',user);
              this.setState({user: user});
              const { store: { dispatch } } = this.context;
              if(user.photo === null){
                console.log('login without picture');
                dispatch( loginWithSocial({
                  username: user.email,
                  firstName: user.givenName,
                  lastName:user.familyName,
                  token: user.id,
                  provider: 'google'
                }));
              }else {
                console.log('login with picture')
                dispatch(loginWithSocial({
                  username: user.email,
                  token: user.id,
                  firstName: user.givenName,
                  lastName:user.familyName,
                  provider: 'google',
                  imageUrl: user.photo
                }));
              }
            })
            .catch((err) => {
              console.log('WRONG SIGNIN', err);
            })
            .done();
        });
    })
      .catch((err) => {
        console.log('Play services error', err.code, err.message);
      });
  };


  render() {
    return (
      <TouchableOpacity style={styles.googleLoginButtonStyle} onPress={this.googleLogIn}>
        <View style={styles.googleLoginViewStyle}>
          <View style={styles.googleIconViewStyle}>
            <Image resizeMode="contain" style={{ height: 26, width: 26 }} source={Images.googleicon} />
          </View>
          <View style={styles.googleTextViewStyle}>
            <Text style={styles.googleLoginbuttonTexStyle}>Google</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
