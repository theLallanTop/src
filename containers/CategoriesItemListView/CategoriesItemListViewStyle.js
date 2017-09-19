import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../theme';
const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 100;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: Colors.transparent
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  fixedSectionRightButtonStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
  backbtnStyle: {
    height: 32,
    width: 32
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

  playerStoryTitleView: {
    flex: 1,
    justifyContent: 'center'
  },

  backImageStyle: {
    height: 15,
    width: 20
  },

  searchBtnStyle: {
    height: 24,
    width: 28,
    marginTop: 20,
    marginLeft: 10
  },

  notificationBtnStyle: {
    height: 24,
    width: 28,
    marginTop: 20,
    marginLeft: 10
  },

  wishlistBtnStyle: {
    height: 24,
    width: 28,
    marginTop: 20,
    marginLeft: 10
  },
  badgeTextStyle: {
    fontSize: Fonts.size.semismall,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.white,
    marginLeft: 0,
  },

  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: Colors.BaseColor
  },

  allStoryStickySection: {
    height: STICKY_HEADER_HEIGHT / 2 +20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: Colors.BaseColor
  },

  TitleTextVisualStyle: {
    textAlign: 'left',
    paddingTop: (Platform.OS === 'ios') ? 10 : 5,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.Walkthrough.medium,
    color: '#F9D0B5'
  },

  stickerHeaderButtonViewStyle: {
    flexDirection: 'row',
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 20 : 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },

  fixedSectionButtonView: {
    marginTop: (Platform.OS === 'ios') ? 30 : 20,
    flexDirection: 'row',
    height: STICKY_HEADER_HEIGHT - STICKY_HEADER_HEIGHT /2
  },

  fixedAllStroySectionButtonView: {
    marginTop: (Platform.OS === 'ios') ? 60 : 52,
    flexDirection: 'row',
    height: STICKY_HEADER_HEIGHT - STICKY_HEADER_HEIGHT /2
  },

  topStoriesStickerViewStyle: {
    marginLeft:50,
    marginTop: (Platform.OS === 'ios') ? 8 : 1,
  },

  topStoriesOldestButtonViewStyle: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 10 : 20,
  },

  backNavigationStyle: {
    flex: 0.2,
    marginLeft: 15,
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchNavStyle: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: -50
  },

  fixedSection: {
    flex: 1,
    width: window.width,
    height: STICKY_HEADER_HEIGHT,
    position: 'absolute',
    bottom: 20,
  },
  // fixedSectionBackButtonStyle: {
  //   flex: 0.2,
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   marginTop: 20,
  //   marginLeft: 10,
  // },
  fixedSectionBackButtonStyle: {
    marginTop: (Platform.OS === 'ios') ? 25 : 20,
    alignItems: 'flex-start',
    marginLeft: 10,
  },

  fixedSectionText: {
    color: Colors.white,
    fontSize: 20
  },

  parallaxMainHeader: {
    flex: 1,
    flexDirection: 'column',
    height: window.height/ 3,
  },

  parallaxHeader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginLeft: 60,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },

  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },

  sectionSpeakerText: {
    color: 'white',
    fontSize: Fonts.size.Title,
    fontFamily: Fonts.Walkthrough.medium,
    paddingVertical: 5
  },

  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },

  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  },
  topStoriesButtonViewStyle: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTopStoreisActiveButtonStyle: {
    flex: 1,
    backgroundColor: Colors.BaseColor,
    borderWidth: 1.5,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  leftTopStoriesDeactiveButtonStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  activeButtonTextStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Fonts.Walkthrough.medium,
    ...Platform.select({
      ios: {
        fontSize: Fonts.size.medium,
      },
      android: {
        fontSize: Fonts.size.regular,
      },
    }),
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: Colors.BaseColor,
    fontFamily: Fonts.Walkthrough.medium,
    ...Platform.select({
      ios: {
        fontSize: Fonts.size.medium,
      },
      android: {
        fontSize: Fonts.size.regular,
      },
    }),
  },
  rightTopStoreisActiveButtonStyle: {
    flex: 1,
    backgroundColor: Colors.BaseColor,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  rightTopStoriesDeactiveButtonStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  rightButtonView: {
    flexDirection: 'row',
    width: 100,
    height: 54,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 22,
      },
      android: {
        top: 0,
      },
    }),
    right: 2,
    padding: 8,
  },
  // badgeStyle: {
  //   marginTop: -15,
  //   width: 15,
  //   height: 15,
  //   backgroundColor: Colors.cloud,
  // },
  // badgeTextStyle: {
  //   color: Colors.white,
  //   fontSize: 10,
  //   lineHeight: 20,
  // },
  rightButtonStyle: {
    marginLeft: 15,
  },
  notificatioNavStyle: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: -30,
    marginLeft: -20
  },
  heartNavStyle: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: -40,
    marginRight: 10
  },

  containerFooter: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: '#8E8E8E',
  },
});