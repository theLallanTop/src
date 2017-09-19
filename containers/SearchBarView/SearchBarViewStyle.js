import { StyleSheet } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles, Metrics } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  searchContainer: {
    flex: 1,
    backgroundColor: Colors.homeBackground,
  },
  navigationBar: {
    height: Metrics.navBarHeight,
    backgroundColor:Colors.BaseColor,
    justifyContent: 'center',
    flexDirection: 'row'
  },

  backNavBtn: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },

  playerStoryTitleView: {
    flex: 1,
    justifyContent: 'center'
  },

  playerPlayIconView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },


  playerStoryTitleTextStyle: {
    marginLeft: 20,
    color: Colors.BaseColor,
    fontFamily: Fonts.Walkthrough.base,
    fontSize: Fonts.size.medium,
  },

  playerButton: {
    height: Metrics.screenHeight / 6 - 50,
    shadowColor: 'grey',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.cloud
  },


  modalViewMicStyle: {
    marginTop: 20,
    backgroundColor: Colors.circleSearchBgColor,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalPopTitleTextStyle:{
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.charcoal
  },

  googleTextBtnStyle: {
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center'
  },

  textUnselectPopStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.regular,
    color: Colors.charcoal,
  },
  textSelectPopStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.regular,
    color: Colors.bloodOrange,
  },

  searchBarLogo: {

  },

});