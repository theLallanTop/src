import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Images, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainTopStoriesRowStyle: {
    flex: 1,
  },
  rowViewStyle: {
  },
  colListViewStyle: {
    marginLeft: 10,
  },
  rowTextStyle: {
    fontFamily: Fonts.Walkthrough.base,
    fontSize: Fonts.size.medium,
  }
});