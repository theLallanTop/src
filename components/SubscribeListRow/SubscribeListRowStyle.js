import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  storyContainer: {
    flex: 1,

  },
  storyRowContainer: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: Colors.white,
  },
  colViewStyle: {
    flex: 1,
  },
  rowTextStyle: {
    paddingLeft: 20,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.input,
    color: Colors.black,
  },
  arrowRowStyle: {
    flex: 0.1,
    alignItems: 'flex-end',
  },

});