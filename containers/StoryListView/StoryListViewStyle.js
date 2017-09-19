import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  storyContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.homeBackground,
  },
});