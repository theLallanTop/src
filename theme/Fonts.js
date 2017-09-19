import { Platform } from 'react-native';
import Colors from './Colors';

const Walkthrough = {
  ...Platform.select({
    ios: {
      base: 'Roboto',
      bold: 'Roboto-Bold',
      emphasis: 'Roboto-Italic',
      emphasisMedium: 'Roboto-MediumItalic',
      light: 'Roboto-Light',
      medium: 'Roboto-Medium',
      extraBold: 'Roboto-Black',
      thin: 'Raleway-Thin'
    },
    android: {
      base: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      emphasis: 'Roboto-Italic',
      light: 'Roboto-Light',
      medium: 'Roboto-Medium',
      extraBold: 'Roboto-Black',
      thin: 'Roboto-Thin'
    }
  }),

};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  semismall: 10,
  tiny: 8,
  Title: 23,
}

const style = {
  WalkthroughTitleTextStyle: {
    fontFamily: Walkthrough.bold,
    fontSize: size.input,
    fontWeight: 'bold',
    color: Colors.black,
    alignSelf: 'center',
  },
  WalkthroughWithoutTitleTextStyle: {
    fontFamily: Walkthrough.regular,
    fontSize: size.input,
    color: Colors.charcoal,
    alignSelf: 'center',
  },
  WalkthroughDescriptionTextStyle: {
    paddingTop: 10,
    fontFamily: Walkthrough.regular,
    fontWeight: '500',
    fontSize: size.medium,
    color: Colors.charcoal,
    alignSelf: 'center',
    textAlign: 'center'
  },
}

const iconFont = 'FontAwesome';

export default {
  Walkthrough,
  size,
  iconFont,
  style
}
