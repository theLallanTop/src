import { StyleSheet, Platform } from  'react-native'
import { Colors, Fonts, ApplicationStyles, Metrics } from '../../theme'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainLogInController: {
    flex: 1,
  },
  skipLogInViewStyle: {
    alignItems: 'flex-end'
  },
  skipLogInButtonStyle: {
    height: 40,
    width: 100,
    marginTop: (Platform.OS === 'ios') ? 15 : 5,
  },
  forgotPasswordViewStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'flex-end'
  },
  loginButtonViewStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  buttomButtonTextStyle: {
    color: Colors.charcoal,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  forgotLeftMarginViewStyle: {
    flex: 0.4,
    marginRight: - 10
  },
  loginButtonStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  inputLoginTextStyle:{
    fontWeight:'bold'
  },
  orViewTextStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: 14,
    color: Colors.charcoallight
  },
  titleTextStyle: {
    color: Colors.panther,
    fontFamily: Fonts.Walkthrough.regular,
    fontWeight: '500',
    fontSize: Fonts.size.Title,
  },
  facebookButtoViewStyle:{
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  googleButtonViewStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  subtextStyle: {
    color: Colors.charcoallight,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  skipLogInTextStyle: {
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 10,
    color: Colors.BaseColor,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  orViewStyle: {
    marginTop: 5,
    alignItems: 'center'
  },
  loginWithTextViewStyle: {
    flex: 1,
    marginTop: 10,
    marginBottom: -15,
    alignItems: 'center',
  },
  signUpSocialButtonStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center'
  },
  logInAlreadyLoginButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

  },
  forgotPasswordTitleTextStyle: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
    color: Colors.panther,
    fontWeight: '500'
  },

  buttonViewStyle: {
    backgroundColor: Colors.IntroSelectedViewColor
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
  }
});