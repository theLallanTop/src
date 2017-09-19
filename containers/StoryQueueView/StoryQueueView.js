import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, NetInfo } from 'react-native';
import styles from './StoryQueueViewStyle';
import { MyAllStoriesListRow } from '../../components';
import { connect } from 'react-redux';
import { getQueueList } from '../../redux/modules/queue';
import { ListItem, List } from 'native-base';
import { Colors } from '../../theme';
import { Actions as NavActions } from 'react-native-router-flux';
import { selectStory, } from '../../redux/modules/storyPlayer';
import { MoreActivityView } from '../../components'
import SnackBar from 'react-native-snackbar-dialog';

class StoryQueueView extends Component {

  static propTypes = {
    queueList: PropTypes.any,
    myStories: PropTypes.any,
    storyPlayerInfo: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  showModalView = (isOpen, storyData) => {
    const { myStories, queueList, storyPlayerInfo } = this.props;
    this.refs.moreActivityView.openModelInQueue(storyData, myStories.myLikeResponded, queueList, storyPlayerInfo );
  };

  componentWillMount() {
    const { store: { dispatch }} = this.context;
    dispatch(getQueueList());
  }


  // internet connection

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
    console.log('connectionInfo', isConnected);
    if(!this.state.isConnected){
      SnackBar.show('Your internet connection has been lost', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    }
  };



  queueListPlayPressed = (storyPlayed) => {
    let index = this.props.queueList.findIndex(x => x.storyId === storyPlayed.storyId);
    const { store: { dispatch } } = this.context;
    dispatch(selectStory(this.props.queueList[index], true, this.props.queueList, index));
    this.props.callback(true, this.props.queueList, index);
    NavActions.pop();
  };

  render () {
    return (
      <View style={styles.storyQueueContainer}>
        <List
          style={{ backgroundColor: Colors.transparent }}
          dataArray={this.props.queueList}
          renderRow={(item) => {
            return(
              <ListItem style={{ backgroundColor: Colors.white }}>
                <MyAllStoriesListRow
                  allstorieslistrow={item}
                  isQueue={true}
                  queueListPlay={this.queueListPlayPressed}
                  onPress={(isMore, storyData) => this.showModalView(isMore, storyData)}
                />
              </ListItem>
            );
          }} />
        <MoreActivityView ref="moreActivityView" />
      </View>
    );
  }
}

export default connect(state => ({
  queueList: state.queue.queueList,
  myStories: state.myStories,
  storyPlayerInfo: state.storyPlayer
}))(StoryQueueView)