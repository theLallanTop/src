import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import { Platform } from  'react-native';

// import DeviceInfo from 'react-native-device-info';
const gaTracker = new GoogleAnalyticsTracker(( Platform.OS === 'ios') ? 'UA-97161448-2' : 'UA-97161448-3');

export default gaTracker;