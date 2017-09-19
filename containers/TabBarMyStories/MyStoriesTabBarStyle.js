import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  myStoriesTabBarMainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
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
});