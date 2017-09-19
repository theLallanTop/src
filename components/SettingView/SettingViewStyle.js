import { StyleSheet } from 'react-native';
import { ApplicationStyles, Images, Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  subViewStyle: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextStyle: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor
  },
  closeTextStyle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium
  },
  closeBtnStyle: {
    width: Metrics.screenWidth / 4.5,
    height: 35,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: Colors.BaseColor,
    alignItems: 'center',
    justifyContent: 'center'
  },

});