import { StyleSheet, Dimensions } from 'react-native';
import { Colors, ApplicationStyles, Fonts, Images } from '../../theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  categoriesRowContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  gridViewStyle: {
    flex: 1,
    height: height/4.5,
    justifyContent: 'center',
  },
  rowStyle: {
    flex: 1,
  },
  leftButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.BaseColor,
  },
  textTitleStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '500',
  },
  discriptionTitleStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: Fonts.size.semismall,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '500',
  }
})