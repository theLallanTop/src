import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ApplicationStyles, Images, Colors, Fonts, Metrics, Transitions } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,

  modalSubContainerStyle: {
    justifyContent: 'center',
    margin: 0,
    borderTopRightRadius: 0,
  },
  SubModelStyle: {
    borderRadius: 2,
    marginLeft: 50,
    marginRight: 50,
  },
  mainSubViewStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  closeButtonViewStyle: {
    alignItems: 'flex-end'
  },
  closeButtonStyle: {
    width: 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BaseColor,
    borderWidth: 0.2,
    borderColor: Colors.white,
    borderRadius: 3.5,
  },
  titleSubStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.panther
  },
  subPlanSubStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor,
    paddingTop: 10
  },
  subTitleSubStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.panther
  },
  buttonTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.white
  }
});
