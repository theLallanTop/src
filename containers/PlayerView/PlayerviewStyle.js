import { StyleSheet, Dimensions, Platform  } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Images, Metrics } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  playerContainer: {
    flex: 1,
  },
  playerBackgroundHeader: {
    height: height/2 + height/6,
    alignSelf: 'center',
  },
  rowViewStyle: {
    flex: 0.15,
    marginTop: (Platform.OS === 'ios') ? 20 : 10,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',

  },
  colViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleViewStyle: {
    borderWidth: 2.5,
    borderColor: Colors.circleBorderColor,
    height: height/ 3,
    width: height/ 3,
    borderRadius: height/6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.circleViewBgColor,
  },
  circleTextViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderContainer: {
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    width: width - 40,
    flex: 0.4,
  },
  slider: {
    height: 25,
  },
  sliderTrack: {
    height: 4,
  },
  sliderThumb: {
    backgroundColor: Colors.transparent
  },
  timeInfo: {
    flexDirection: 'row',
  },
  track: {
    height: 2,
    backgroundColor: Colors.BaseColor,
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: Colors.white,
    borderColor: Colors.BaseColor,
    borderWidth: 3,
  },
  startTime: {
    color: Colors.BaseColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    paddingTop: -4,
    fontWeight: '600',
    flex: 1,
  },
  timeRight: {
    color: Colors.BaseColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    textAlign: 'right',
    paddingTop: -4,
    fontWeight: '600',
    flex: 1,
  },
  closeNavViewStyle: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15
  },
  playTitleTextStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.playerTitleTextColor,
    fontWeight: '500'
  },
  playBtnStyle: {
    height: 70,
    width: 70,
    resizeMode: 'contain'
  },
  nextBtnStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain'
  },
  btnStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  discriptionTitleTextStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.input,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.playerSubTextColor,
    fontWeight: '500'
  },

});