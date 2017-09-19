import { StyleSheet, Dimensions } from 'react-native';
import { Colors, ApplicationStyles, Fonts } from '../../theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subsTabBarCardRowContainer: {
    flex: 1,
    backgroundColor: Colors.homeBackground
  },

});