import { StyleSheet, Dimensions } from 'react-native';
import { Colors, ApplicationStyles, Fonts } from '../../theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  CardRowContainer: {
    flex: 1,
    height: height /3.8
  },
  titleViewStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  priceViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonViewStyle:{
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.charcoal
  },
  buttonTextStyle:{
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor
  },
  pricetextStyle:{
    textAlign: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.panther,
  },
  titleTextStyle:{
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.charcoallight
  },
  myPlanCardRowContainer: {
    flex: 1,
    height:100
  },

});