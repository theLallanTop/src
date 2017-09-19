import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Images, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainTopStoriesRowStyle: {
    flex: 1,
  },
  rowViewStyle: {
    // borderBottomWidth: 0.2,
    // borderBottomColor: Colors.coal
  },
  colListViewStyle: {
    flex: 1,
    // marginBottom: 5,
    // marginTop: 5,
     marginLeft: 10,
  },
  alreadyDownloadIconStyle: {
    color: Colors.BaseColor,
    fontSize: 20
  },
  downloadIconStyle: {
    color: Colors.charcoallight,
    fontSize: 20
  }
});