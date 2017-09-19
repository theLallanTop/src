import { StyleSheet, Platform } from  'react-native';
import { Colors, Fonts, ApplicationStyles, Metrics } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,

  mainSignUpController: {
    flex: 1,
  },

  skipSignUpViewStyle: {
    alignItems: 'flex-end'
  },

  skipSignUpButtonStyle: {
    height: 40,
    width: 100,
    marginTop: (Platform.OS === 'ios') ? 15 : 5,
  },
  buttomButtonTextStyle: {
    color: Colors.charcoal,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  inputTextStyle:{
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight:'bold'
  },

  skipSignUpTextStyle: {
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 10,
    color: Colors.BaseColor,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  signUpButtonViewStyle: {
    flex: 1,
    margin: 10,
  },
  orViewStyle: {
    marginTop: 10,
    alignItems: 'center'
  },
  facebookViewStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  googleViewStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },

  signUpWithTextViewStyle: {
    flex: 1,
    marginTop: 10,
    marginBottom: -15,
    alignItems: 'center'
  },

  signUpButtonStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },

  orViewTextStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: 14,
    color: Colors.charcoallight
  },

  titleTextStyle: {
    color: Colors.panther,
    fontFamily: Fonts.Walkthrough.regular,
    fontSize: 24,
    fontWeight: '500'
  },

  subtextStyle: {
    color: Colors.charcoallight,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },

  signUpSocialButtonStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center'
  },

  signUpAlreadyLoginButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  buttonViewStyle: {
    backgroundColor: Colors.BaseColor,
  },
  toastStyle: {
    backgroundColor:Colors.charcoallight,
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  toastTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
    loginButtonStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.regular,
  }

});