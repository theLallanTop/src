import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  homeMainContainer: {
    flex: 1,
  },
  homeTopTabSelectedText: {
    color: Colors.white,
  },
  homeTopTabUnselectedText: {
    color: Colors.unselectedTabBarTextColor,
  },
  homeTopTabBarTabStyle: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.statusBarColor,
    borderBottomColor: Colors.white,
  },
  tabView: {
    flex: 1,
    backgroundColor: Colors.homeBackground,
  },
});