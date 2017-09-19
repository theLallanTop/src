import React, { Component, PropTypes } from 'react';
import { View, StatusBar, Text, Image, Dimensions, ScrollView, Navigator, BackAndroid, Alert } from 'react-native';
import styles from './HomeStyle';
import { TopTabBar, HomeTabBar, MyStoriesTabBar, SubscribeTabBar } from '../../containers';
import { Colors, Metrics, Images } from '../../theme';
import {Reducer} from 'react-native-router-flux';

var ScrollableTabView = require('react-native-scrollable-tab-view');


const selectedTabImages = [Images.hometabbaractiveicon, Images.mystorytabbaractiveicon, Images.subscribetabbaractiveicon];
const tabImages = [Images.hometabbaricon, Images.mystorytabbaricon, Images.subscribetabbaricon];


export default class Home extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  render() {

    return (
      <ScrollableTabView
        style={{ marginTop: Metrics.navBarHeight }}
        initialPage={0}
        renderTabBar={() =>
          <TopTabBar
            selectedTabImages={ selectedTabImages }
            tabImages={tabImages}
            tabTitleText={['HOME', 'MY STORIES', 'SUBSCRIBE']}
          />
        }
      >
        <View tabLabel="HOME" style={styles.tabView}>
          <HomeTabBar />

        </View>
        <View tabLabel="MY STORIES" style={styles.tabView}>
          <MyStoriesTabBar />
        </View>
        <View tabLabel="SUBSCRIBE" style={styles.tabView}>
          <SubscribeTabBar />
        </View>


      </ScrollableTabView>
    );
  }
}

