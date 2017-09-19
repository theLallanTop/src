import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  bankListRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  bankRowTextViewStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  bankrowIconViewStyle:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rowButtonStyle: {
    flexDirection: 'row',
    flex: 1,
    height: 25
  }


});
