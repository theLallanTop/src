import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ApplicationStyles, Images, Colors, Fonts, Metrics, Transitions } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,

  modalDialogContainerStyle: {
    justifyContent: 'center',
    margin: 0,
    borderTopRightRadius: 0,
  },
  dialogModelStyle: {
    borderRadius: 2,
    marginLeft: 50,
    marginRight: 50,
  },
  mainDialogViewStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  closeButtonViewStyle: {
    alignItems: 'flex-end'
  },
  closeButtonStyle: {
    width: 50,
    alignItems: 'flex-end'
  },
  subscribeViewStyle: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
    height: 35
  },
  subscribeButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BaseColor,
    borderRadius: 2
  },
  subscribeTextStyle: {
    marginLeft: 30,
    marginRight: 30,
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
  },
  titleTextStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.Walkthrough.base,
  }

});
