import React, { Component , PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme';
import { Icon } from 'native-base';
import styles from './MoreActivityStyle';
import Modal from 'react-native-simple-modal';
import { likeStory } from '../../redux/modules/myStories'
import { addToQueueList, deleteFromQueueList } from '../../redux/modules/queue';
import { updatePlayerQueue } from '../../redux/modules/storyPlayer';
import { deleteDownloadStory } from '../../helpers/Download';

export default class MoreActivityView extends Component {

  static propTypes = {
    storyData: PropTypes.any,
    isOpen: PropTypes.any,
    OpenModel: PropTypes.any,
  };

  constructor(){
    super();
    this.state = {
      open: false,
      likeStoriesList: [],
      queueListData: [],
      isQueue: false,
      storyPlayed: null,
    }
  }

  static contextTypes = {
    store: PropTypes.object
  };

  onPressLikeBtn = () => {
    this.setState({ open: false });
      new Promise((resolve, reject) => {
        const { store: { dispatch } } = this.context;
        dispatch(likeStory(this.state.storyData))
          .then((res) => {

          })
          .catch((error) => {

          })
      });
    };


  onPressAddToQueueBtn = () => {
    if(this.state.isQueue) {
      const { storyData, queueListData } = this.state;
      this.setState({ open: false });
      const { store: { dispatch } } = this.context;
      dispatch(deleteFromQueueList(storyData));
      dispatch(updatePlayerQueue(storyData, queueListData, true))

    } else {
      const { storyData, queueListData } = this.state;
      this.setState({ open: false });
      const { store: { dispatch } } = this.context;
      dispatch(addToQueueList(storyData));
      //sdispatch(updatePlayerQueue(storyData, queueListData, false))
    }
  };

  onPressDeleteBtn = () => {
    this.setState({ open: false });
    new Promise((resolve, reject) => {
      const { store: { dispatch } } = this.context;
      dispatch(deleteDownloadStory(this.state.storyData))
        .then((res) => {

        })
        .catch((error) => {

        })
    });
  };


  openModel = (storydata, likedListData, queueList) => {
    this.setState({storyData: storydata, open: true, likeStoriesList: likedListData, queueListData: queueList });
  };

  openModelInQueue = (storydata, likedListData, queueList, selectedStory) => {
    this.setState({
      storyData: storydata,
      open: true,
      likeStoriesList: likedListData,
      queueListData: queueList,
      isQueue: true,
      storyPlayed: selectedStory.storyPlayed
    });
  };

  render() {
    const { storyData, likeStoriesList, queueListData } = this.state;
    var rate = [];
    for(let i = 0; i < 5; i++){
      rate.push(
        <View key = {i}>
          <View>
            <Icon name='md-star' style={{color: '#FFC118', fontSize: 14}} />
          </View>
        </View>
      )
    }
    let likeList = likeStoriesList;
    let isLiked = false;
    let isLikedList = likeList.filter((likeStory) => likeStory.storyId === storyData.storyId);
    if(isLikedList.length === 1) {
      isLiked = isLikedList[0].isLiked
    }
    let queueButtonTitle = 'Add to queue';
    if(this.state.isQueue) {
      queueButtonTitle = 'Delete from queue'
    } else {
      let isQueueList = queueListData.filter((story) => story.storyId === storyData.storyId);
      if (isQueueList.length === 1) {
        queueButtonTitle = 'Already in queue list'
      }
    }
    return(
      <Modal
        open={this.state.open}
        modalDidOpen={() => console.log('open')}
        modalDidClose={() => this.setState({open: false }) }
        containerStyle={styles.modalContainerStyle}
      >
        <View>
          <Text style={styles.storyTitleText}>{storyData ? storyData.title : ''}</Text>
          <View style={styles.rateViewStyle}>{rate}</View>
          <View style={styles.modalViewSeparator}/>
          <TouchableOpacity
            style={styles.buttonViewStyle}
            onPress={this.onPressLikeBtn}
          >
            <Icon
              name='md-heart'
              style={{
                color: isLiked ? Colors.BaseColor : Colors.charcoallight,
                fontSize: 20,
                marginRight: 10}}
            />
            <Text style={styles.optionTextStyle}>{isLiked ? 'Liked' : 'Like'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonViewStyle}
            onPress={this.onPressAddToQueueBtn}
          >
            <Icon
              name='md-add'
              style={{
                color: Colors.BaseColor,
                fontSize: 20,
                marginRight: 10}}
            />
            <Text style={styles.optionTextStyle}>{queueButtonTitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonViewStyle}
            onPress={this.onPressDeleteBtn}
          >
            <Icon
              name='md-trash'
              style={{
                color: Colors.BaseColor,
                fontSize: 20,
                marginRight: 10}}
            />
            <Text style={styles.optionTextStyle}>Delete</Text>
          </TouchableOpacity>
          <View style={styles.modalViewSeparator}/>
          <TouchableOpacity
            style={styles.cancelButtonStyle}
            onPress={() => this.setState({open: false})}>
            <Text style={styles.cancelTextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
