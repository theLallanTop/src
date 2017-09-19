import { StyleSheet } from 'react-native';
import { ApplicationStyles, Images, Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ratingContainer: {
    flex: 1,
  },
  ratingContainerStyle: {
    flex: 1,
    borderTopRightRadius: 0,
  },
  closeViewStyle: {
    marginRight: 10,
  },
  ratingStyle: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  closeTextStyle: {
    color: Colors.white,
    textAlign: 'center'
  },
  titleTextStyle: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor
  },
  discTextStyle: {
    paddingTop: 5,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor
  },
  subViewStyle: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

});