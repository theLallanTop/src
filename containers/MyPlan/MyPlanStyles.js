import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../theme';
export default StyleSheet.create({
  myPlanContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.homeBackground,
  },
  viewMainStatusStyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    backgroundColor: Colors.white,
    flexDirection: 'row'
  },
  textStatusRemainStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  ramainTextStyle: {
    textAlign: 'right',
    paddingRight: 20,
    color: Colors.BaseColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium
  },
  textStatusStyle: {
    color: Colors.charcoal,
    paddingLeft: 10,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '400'
  },
  textStatusViewStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
});
