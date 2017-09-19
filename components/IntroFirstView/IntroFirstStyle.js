import { StyleSheet } from  'react-native';
import { ApplicationStyles } from '../../theme'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainViewContainer: {
    alignSelf: 'center',
    marginTop: 30
  },
  IntroIconStyle: {
    alignSelf: 'center',
  },
  imageViewStyle: {
    margin: 20
  },
  DescripTextViewStyle: {
    flex: 1,
    alignItems: 'center',
  },
});