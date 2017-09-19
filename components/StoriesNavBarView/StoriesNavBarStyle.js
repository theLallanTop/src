import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Images, ApplicationStyles } from '../../theme';
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 100;
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  fixedSectionButtonView: {
    marginTop: (Platform.OS === 'ios') ? 30 : 20,
    flexDirection: 'row',
    height: STICKY_HEADER_HEIGHT - STICKY_HEADER_HEIGHT /2
  },
  fixedSectionBackButtonStyle: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10
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

});