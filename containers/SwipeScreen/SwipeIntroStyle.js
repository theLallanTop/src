import { StyleSheet, Platform } from  'react-native';
import { Colors , ApplicationStyles, Fonts } from '../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainSwipeController: {
    flex: 1,
  },
  subSwipeViewStyle: {
    flex: 1,
    backgroundColor: Colors.cloud
  },
  skipViewStyle: {
    alignItems: 'flex-end',
    backgroundColor: Colors.cloud
  },
  skipButtonStyle: {
    height: 40,
    width: 100,
    marginTop: (Platform.OS === 'ios') ? 15 : 5,

  },
  // use--less
  circleSwipeDefaultStyle:{
    backgroundColor: Colors.cloud,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginTop: 5
  },
  circleSwipeActiveStyle :{
    backgroundColor: Colors.BaseColor,
    height: 10,
    marginTop: 10
  },
  //---
  skipTextStyle: {
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 10,
    color: Colors.BaseColor,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  walkViewStyle: {
    flex: 1,
    marginBottom: 10
  },
  buttonViewStyle: {
    flex: 0.12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftSelectedButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BaseColor,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  leftUnselectedButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.IntroUnselectedViewColor,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  rightSelectedButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BaseColor,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10 ,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  rightUnselectedButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.IntroUnselectedViewColor,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10 ,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  activeButtonTextStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: Colors.IntroUnselectedViewColor,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.medium,
  },

});