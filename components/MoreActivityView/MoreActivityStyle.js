import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ApplicationStyles, Images, Colors, Fonts, Metrics, Transitions } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    height: height /2 - 20,
  },
  rowItemViewStyle: {
    flexDirection: 'column',
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.charcoal,
  },
  textViewStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconStyle: {
    // alignSelf: 'center',
    height: 20,
    width: 20,
    margin: 10,
  },
  iconTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.charcoal
  },

  modalContainerStyle: {
    justifyContent: 'flex-end',
    margin: -20,
    borderTopRightRadius: 0
  },
  storyTitleText: {
    fontSize: Fonts.size.h6,
    marginBottom: 5
  },
  rateViewStyle: {
    flexDirection: 'row',
    marginBottom: 10
  },
  modalViewSeparator: {
    height: 0.5,
    backgroundColor: Colors.coal
  },
  buttonViewStyle: {
    marginBottom: 5,
    marginTop: 5,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconStyles: {
    color: Colors.BaseColor,
    fontSize: 20,
    marginRight: 10
  },
  cancelButtonStyle: {
    marginTop: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelTextStyle: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor
  },
  optionTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.base,
  }


});