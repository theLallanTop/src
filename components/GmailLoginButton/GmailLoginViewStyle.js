import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../theme';
export default StyleSheet.create({
  googleLoginButtonStyle: {
    flex: 1,
    height: 50,
    borderRadius: 3,
    backgroundColor: Colors.googleIconViewColor,
  },
  googleLoginViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  googleIconViewStyle: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  googleIconStyle: {
    color: Colors.white,
    fontSize: 20
  },
  googleTextViewStyle: {
    flex: 1,
    marginLeft: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLoginbuttonTexStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
    color: Colors.white
  },

});