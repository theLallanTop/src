import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  storyQueueContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  storyQueueListStyle: {
    backgroundColor: Colors.homeBackground,
    marginLeft: -20
  },
  storyListItemStyle: {
    backgroundColor: Colors.white
  }
});