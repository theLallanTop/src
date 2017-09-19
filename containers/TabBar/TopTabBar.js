import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Images, Metrics } from '../../theme';
import Styles from './TopTabBarStyle';

const TopTabBar = React.createClass({
  tabIcons: [],
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i));
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {

    const { activeTab, selectedTabImages, tabImages, tabTitleText } = this.props;
    console.log('Active tab : ',this.props.activeTab);
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity
          key={tab}
          onPress={() => this.props.goToPage(i)}
          style={[styles.tab, {borderBottomWidth: 3, borderColor: i === activeTab ? Colors.white : Colors.transparent }]}
        >
          <Image
            /* source={i === activeTab ? selectedTabImages[i] : tabImages[i]}*/
            source={tabImages[i]}
            style={Styles.tabBarIconStyle}
          />
          <Text
            style={[Styles.tabTextStyle, {color: i === activeTab ? Colors.white :  Colors.unselectedTabBarTextColor}]}
          >
            {tabTitleText[i]}
          </Text>
        </TouchableOpacity>;
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    flexDirection: 'column'
  },
  tabs: {
    height: Metrics.tabBarHeight,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: Colors.BaseColor
  },
});

export default TopTabBar;

