import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, ApplicationStyles, Fonts, Images, Metrics } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wishlistContainer: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  iconheartStyle: {
    flex: 1,
    marginTop: height/2 - height/5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wishlistTextViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  wishlistViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  wishlistHeartIconStyle: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 70/2,
    resizeMode: 'contain'
  },

  wishlistTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    textAlign: 'center'
  },
  addBtnViewStyle: {
    flex: 1,
    backgroundColor: Colors.BaseColor,
    height: 35,
    width: width - width/ 2,
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBtnTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.regular,
    fontWeight: '500',
    color: Colors.white
  },
  downloadAllViewStyle: {
    height: 50,
    backgroundColor: Colors.BaseColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  downloadAllTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.regular,
    color: Colors.white,
    fontWeight: '500'
  },
  storiesTopButtonStyle: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
