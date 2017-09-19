import { StyleSheet, Dimensions } from 'react-native';
import { Colors, ApplicationStyles, Fonts, Images } from '../../theme';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  newStoryRowContainer: {
    flex: 1,
  },
  rowViewStyle: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    height: height/6,
    width: width/4,
    backgroundColor: Colors.white
  },
  rowSubViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height/9,
    width: width/4,
  },
  subTitleTextViewStyle: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitleTextStyle: {
    paddingTop: 5,
    textAlign: 'center',
    fontSize: Fonts.size.semismall,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '500',
    color: Colors.charcoal,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '600',
  }
})