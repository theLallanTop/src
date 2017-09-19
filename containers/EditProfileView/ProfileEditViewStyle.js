import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, ApplicationStyles, Fonts, Images, Metrics } from '../../theme';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  editProfileContainer: {
    flex: 1,
    marginTop: 10,
  },
  profileImageStyle: {
    height: height / 6,
    width: height / 6,
    borderRadius: height / 12,
    alignSelf: 'center'
  },
  submitBtnViewStyle: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   submitBtnStyle: {
     height: 35,
     width: width / 3,
     backgroundColor: Colors.BaseColor,
     borderRadius: 4,
     justifyContent: 'center'
  },
  btnTextStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.white
  },
  datePickerStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.charcoallight
  },
  radioStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  radioBtnStyle: {
    margin: 20,
    fontSize: Fonts.size.medium,
    color: Colors.coal,
    fontFamily: Fonts.Walkthrough.medium
  },

});