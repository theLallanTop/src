import { StyleSheet, Dimensions  } from  'react-native';
import { Fonts, ApplicationStyles } from '../../theme';
const window = Dimensions.get('window');
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