import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  okButtonView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  okButtonStyle: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BaseColor,
    width: 100,
    borderRadius: 5
  },
  okButtonTextColor: {
    color: Colors.white,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.input,
  }
});
