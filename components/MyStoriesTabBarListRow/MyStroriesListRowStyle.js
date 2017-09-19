import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  myStoriesTabBarRowMainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  colViewStyle: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  rowTextStyle: {
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.input,
    color: Colors.black
  },
  arrowRowStyle: {
    flex: 0.06,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5
  },

});