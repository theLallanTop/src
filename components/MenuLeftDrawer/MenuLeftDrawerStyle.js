import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: Colors.white,
  },
  topView: {
    flex: 1,
    backgroundColor: Colors.BaseColor,
    height: Metrics.screenHeight/6 - 8,
  },
  iPhoneTopView: {
    flex: 1,
    backgroundColor: Colors.BaseColor,
    height: Metrics.screenHeight/5,
  },
  logoIcon: {
    marginTop: (Platform.OS === 'ios') ? 10 : 2,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    height: 60,
    width: 60,
    borderRadius: 30
  },
  textColStyle: {
    flex: 0.7,
    marginTop: (Platform.OS === 'ios') ? 5 : 1,
    justifyContent: 'center'
  },
  emailText: {
    fontFamily: Fonts.Walkthrough.base,
    fontSize: Fonts.size.medium,
    color: Colors.white,
  },
  buttonLeftStyle: {
    flex: 1,
    margin: 15,
  },
  buttonTextStyle: {
    fontFamily: Fonts.Walkthrough.bold,
    fontSize: Fonts.size.medium,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
  },
  loginTextStyle: {
    fontFamily: Fonts.Walkthrough.bold,
    fontSize: (Platform.OS === 'ios') ? 12 : Fonts.size.medium,
    color: Colors.BaseColor,
    textAlign: 'left'
  },
  IphoneloginTextStyle: {
    fontFamily: Fonts.Walkthrough.bold,
    fontSize: Fonts.size.semismall,
    color: Colors.BaseColor,
    textAlign: 'center'
  },
  switchButtonViewStyle: {
    flex: 0.8,
    alignItems: 'flex-end',
    marginRight: 20
  },
  iconStyle:{
    width: 25,
    height: 22
  },
  titleText: {
    fontFamily: Fonts.Walkthrough.bold,
    fontSize: Fonts.size.regular,
    color: Colors.white,
    textAlign: 'left'
  }
});