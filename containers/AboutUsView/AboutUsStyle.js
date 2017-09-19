import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles, Metrics } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  textviewContainer:{
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  textaboutusStyle: {
    fontFamily: Fonts.Walkthrough.regular,
    fontSize: Fonts.size.regular,
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 30
  },
})
