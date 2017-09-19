import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ApplicationStyles, Images, Colors, Fonts, Metrics, Transitions } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  childModeTitleTextStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.medium,
    marginBottom: 10,
    color: Colors.BaseColor
  },
  childModeButtonViewStyle: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    height: 35
  },
  childModeButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BaseColor,
    borderRadius: 2
  },
  childModeButtonTextStyle: {
    marginLeft: 30,
    marginRight: 30,
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
  },

});
