import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  homeTabBarMainContainer: {
    flex: 1,
    backgroundColor: Colors.homeBackground,
  },
  storiesGridStyle: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: height/8 + 20,
  },
  headerImageStyle: {
    flex: 1,
    width: width/2 - 15,
    height: height/8 + 20,
  },
  storiesFreeButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  storiesTextStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.white,
    backgroundColor: Colors.transparent,
    fontWeight: '500',
  },
  TitleTextStyle: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.coal,
    fontWeight: '400',
  },
  viewAllTextStyle: {
    fontSize: (Platform.OS === 'ios') ? Fonts.size.medium : Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor,
    fontWeight: '400',
  },
  storiesTopButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newStriesGridStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewAllStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewAllButtonStyle: {
    flex: 0.5,
    color: Colors.BaseColor
  },
  categoriesViewStyle: {
    marginTop: -5,
    marginLeft: -5,
    marginRight: -5
  },
  newstoriesViewStyle: {
    flex: 1,
    marginLeft: 10,
    marginTop: 20
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