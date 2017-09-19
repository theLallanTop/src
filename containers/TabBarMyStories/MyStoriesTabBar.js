import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme';
import styles from './MyStoriesTabBarStyle';
import { MyStoriesListRow } from '../../components';
import {List, ListItem, Grid, Row, Col, Container, Content, Icon } from 'native-base';
import myTracker from '../../helpers/myTracker';
// import { getcategorieslist, getnewstorieslist } from '../../redux/modules/homeAuth';
import { getmystorieslist } from '../../redux/modules/myStories';
import { connect } from 'react-redux';
import Enumerable from 'linq';
import { Actions as NavActions } from 'react-native-router-flux';
var list = [];

class MyStoriesTabBar extends Component {

  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      mystories: []
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    storyPlayerInfo: PropTypes.any
  };
  static contextTypes = {
    store: PropTypes.object
  };

  showPlayerView = () => {
    NavActions.playerview({ isNext: false });
  };


  componentWillMount() {
    list = [
      {
        ButtonName: 'All Stories',
      },
      {
        ButtonName: 'My Likes',
      },
      {
        ButtonName: 'Recent Downloads',
      }
    ];

    new Promise((resove, reject) => {
      const { store: { dispatch }} = this.context;
      dispatch(getmystorieslist())
        .then((res) => {
          console.log('Add downloaded story list Successful');

          const groupedData = Enumerable.from(res)
            .groupBy(function (x) {
              return x.tagTitle
            });
          groupedData.forEach((item) => {
            let category = item.key();
            let catArray = [];
            item.getSource().forEach((title) => {
               catArray.push(title);
            });
            let infodata = {
              title: catArray[0].tagTitle,
              tagId: catArray[0].tagId,
            };
            list.push({
              ButtonName: category,
              data: infodata
            });
          });
          const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.setState ({ mystories: ds.cloneWithRows(list)});
          resolve();
        })
        .catch((error) => {
          console.log('Add downloaded story list Unsuccessful');
          reject();
        })
    });
  }

  render() {
    const { storyPlayerInfo } = this.props;
    myTracker.allowIDFA(true);
    myTracker.setAppName('Fir kya hua');
    myTracker.trackScreenView('My Stories');
    myTracker.trackEvent('testcategory', 'testaction');
    return(
      <Container style={{ flex: 1 }}>
        <Content>
          <List
            dataArray={list}
            renderRow={(item, sectionID, rowID) => {
              return(
                 <MyStoriesListRow mystories={item} rowID={rowID} />
              );
            }}
          />
        </Content>
        { storyPlayerInfo.storyPlayed !== null &&
        <TouchableOpacity
          style={styles.playerButton}
          onPress={this.showPlayerView}
        >
          <View style={styles.playerStoryTitleView}>
            <Text style={styles.playerStoryTitleTextStyle}>
              {storyPlayerInfo.storyPlayed.title}
            </Text>
          </View>
          <View style={styles.playerPlayIconView}>
            <Icon name={storyPlayerInfo.isStoryPlaying ? "md-pause" : "md-play"} style={{color: Colors.BaseColor}}/>
          </View>
        </TouchableOpacity>
        }
      </Container>
    )
  }
}

export default connect(state => ({
  storyPlayerInfo: state.storyPlayer,
}))(MyStoriesTabBar)