import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      marginTop: Metrics.navBarHeight,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: null,
      height: null,
      resizeMode: 'cover', // or 'stretch'
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin
    }
  }
}

export default ApplicationStyles
