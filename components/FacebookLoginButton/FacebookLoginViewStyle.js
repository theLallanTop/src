import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,

  fbLoginButtonStyle: {
    flex: 1,
    height: 50,
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: Colors.fbIconViewColor,
  },
  fbLoginViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fbIconViewStyle: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 3,
  },
  fbIconStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: Colors.white,
    fontSize: 20
  },
  fbTextViewStyle: {
    flex: 1,
    marginLeft: -30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fbLoginbuttonTexStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
    color: Colors.white
  },

});
