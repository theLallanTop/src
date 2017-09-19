import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollTabBarContainerStyle: {
    marginTop: Metrics.tabBarHeight,
  },
  scrollExpTabBarTabSelectedTitleStyle: {
    color: Colors.white,
    fontFamily: Fonts.Walkthrough.medium,
    paddingTop: 5,
  },
  tabTextStyle: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '600'
  },
  tabBarIconStyle: {
    marginTop: (Platform.OS === 'ios') ? 5 : 2,
    marginBottom: (Platform.OS === 'ios') ? 5 : 2,
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 18,
    width: 22,
  },

///play view style

  playerButton: {
    height: Metrics.screenHeight / 6 - 50,
    // shadowColor: 'grey',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.cloud
  },

  playerStoryTitleView: {
    flex: 1,
    justifyContent: 'center'
  },

  playerStoryTitleTextStyle: {
    marginLeft: 20,
    color: Colors.BaseColor,
    fontFamily: Fonts.Walkthrough.base,
    fontSize: Fonts.size.medium,
  },

  playerPlayIconView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
