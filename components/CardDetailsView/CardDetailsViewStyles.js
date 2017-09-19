import { StyleSheet, Platform } from  'react-native'
import { Colors, Fonts, ApplicationStyles, Metrics } from '../../theme'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardViewStyles: {
    borderWidth: 1,
    borderColor: Colors.BaseColor
  },
  cardDetailsButtonStyle: {
    flex: 1,
    height: 40,
    margin: 20,
    backgroundColor: Colors.BaseColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardDetalsButtonTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.input,
  },
  errorMessageTextStyle: {
    color: Colors.red,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.input,
  },
  monthYearTextStyle: {
    fontFamily: Fonts.Walkthrough.medium,
    fontSize: Fonts.size.input,
    fontWeight:'bold',
    color: '#575757'
  },
  monthYearColStyle: {
    flex: 1,
    marginLeft: 20,
    marginRight: 0,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D5DC',
    justifyContent: 'center',
    height: 40
  }

});
