import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import { likeStory } from '../../redux/modules/myStories'
import { Images, Colors, Fonts, Metrics } from '../../theme';
import Slider from 'react-native-slider';
import { Actions as NavActions } from 'react-native-router-flux';
import { Col, Row, Icon } from 'native-base';
import styles from './PlayerviewStyle';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux'
import { RatingView } from '../../components';
import { deleteDownloadStory } from '../../helpers/Download';
import { storyPlayingStatus, selectStory } from '../../redux/modules/storyPlayer';
let whoosh = undefined;
let intervalId = undefined;
let timer = 0;


class Playerview extends Component {

  constructor() {
    super();
    this.state = {
      sliding: false,
      totalTime: 0,
      isPlaying: false,
      songDuration: 0,
      currentTime: 0,
      valuePercentage: 0,
      maxTime: 0,
      isQueueStoryPlay: false,
      queueList: [],
      queueIndex: 0,
      story: null,
      isRating: false,
      isRepeat: false,
    };
  }

  static propTypes = {
    likeStoryList: PropTypes.any,
    isNext: PropTypes.any,
  };


  queueListPlayed = (localStory) => {
    console.log('Queue List played *************************');
    this.setState({
      sliding: false,
      totalTime: 0,
      isPlaying: false,
      songDuration: 0,
      currentTime: 0,
      valuePercentage: 0,
      maxTime: 0,
      queueList: this.props.queueListData
    });
    whoosh = undefined;
    whoosh = new Sound(localStory, '', (error) => {
      if (error) {
        console.log('sound play error', error);
        return;
      }
      this.setState({
        maxTime: whoosh.getDuration(),
        totalTime: whoosh.getDuration(),
      });
      timer = 0;
      whoosh.play((success) => {
        if (success) {
          console.log('Queue List success *************************',this.state.queueList,this.state.queueIndex)
          if(this.state.queueIndex < this.state.queueList.length-1) {

            if (whoosh !== undefined) {
              whoosh.stop();
              whoosh.release();

              this.setState({
                maxTime: 0,
                totalTime: 0,
              })
            }
            const { store: { dispatch } } = this.context;
            dispatch(selectStory(this.state.queueList[this.state.queueIndex], true, this.state.queueList, this.state.queueIndex))
            dispatch(storyPlayingStatus(true));
            let storyId = this.state.queueList[this.state.queueIndex].storyId;
            clearInterval(intervalId);
            const localSong = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${storyId}.m4a`;
            this.setState({
              story: this.state.queueList[this.state.queueIndex + 1],
              queueIndex: this.state.queueIndex + 1
            });
            this.queueListPlayed(localSong);
          } else {
            const { store: { dispatch } } = this.context;
            dispatch(storyPlayingStatus(false));
          }

          // console.log('successfully finished playing');
          //this.setState({ isPlaying: !this.state.isPlaying })
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      this.setState({isPlaying: !this.state.isPlaying});
      this.getTimerCountDown(this.state.totalTime);

    });
  };

  onPressCloseBtn = () => {
    NavActions.pop()
  };

  static contextTypes = {
    store: PropTypes.object
  };

  onPressLikeBtn = () => {

    new Promise((resolve, reject) => {
      const { store: { dispatch } } = this.context;
      dispatch(likeStory(this.state.story))
        .then((res) => {

        })
        .catch((error) => {

        })
    });
  };

  onPressPreviousBtn = () => {
    const { queueList, queueIndex } = this.state;
    if(queueIndex >= 1) {

      if (whoosh !== undefined) {
        whoosh.stop();
        whoosh.release();

        this.setState({
          maxTime: 0,
          totalTime: 0,
        })
      }
      const { store: { dispatch } } = this.context;
      dispatch(selectStory(queueList[queueIndex - 1], true, queueList, queueIndex-1));
      let storyId = queueList[queueIndex - 1].storyId;
      clearInterval(intervalId);
      const localSong = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${storyId}.m4a`;
      this.setState({
        story: queueList[queueIndex - 1],
        queueIndex: queueIndex - 1
      });
      this.queueListPlayed(localSong);
    }
  };


  onPressNextBtn = () => {
    const { queueList, queueIndex } = this.state;
    const { storyPlayerInfo } = this.props;
    if(storyPlayerInfo.isQueuePlayed) {
      if (queueIndex < queueList.length - 1) {

        if (whoosh !== undefined) {
          whoosh.stop();
          whoosh.release();

          this.setState({
            maxTime: 0,
            totalTime: 0,
          })
        }
        const { store: { dispatch } } = this.context;
        dispatch(selectStory(queueList[queueIndex + 1], true, queueList, queueIndex + 1))
        let storyId = queueList[queueIndex + 1].storyId;

        clearInterval(intervalId);
        const localSong = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${storyId}.m4a`;
        this.setState({
          story: queueList[queueIndex + 1],
          queueIndex: queueIndex + 1
        });
        this.queueListPlayed(localSong);
      }
    }
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.storyPlayerInfo.isDeleted) {

      timer = 0;
      whoosh.stop();
      whoosh.release();
      clearInterval(intervalId);
      const { store: { dispatch } } = this.context;
      dispatch(storyPlayingStatus(false));
      const localSong = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${nextProps.storyPlayerInfo.storyPlayed.storyId}.m4a`;
      whoosh = new Sound(localSong, '', (error) => {
        if (error) {
          console.log('sound play error', error);
          return;
        }
        this.setState({
          maxTime: whoosh.getDuration(),
          totalTime: whoosh.getDuration(),
          isPlaying: false,
          currentTime: 0,
          queueList: nextProps.storyPlayerInfo.queueList,
          queueIndex: nextProps.storyPlayerInfo.queueIndex,
          story: nextProps.storyPlayerInfo.storyPlayed,
        })
      })
    }
    this.setState({
      queueList: nextProps.storyPlayerInfo.queueList,
      queueIndex: nextProps.storyPlayerInfo.queueIndex,
      story: nextProps.storyPlayerInfo.storyPlayed,
    });
  }


  componentWillMount() {

    const { storyPlayerInfo } = this.props;
    const { store: { dispatch } } = this.context;
    this.setState({
      story: storyPlayerInfo.storyPlayed
    });

    if(this.props.isNext === true) {
      if (whoosh !== undefined) {
        whoosh.stop();
        whoosh.release();
        this.setState({
          maxTime: 0,
          totalTime: 0,
        })
      }
      clearInterval(intervalId);
      const localSong = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${this.props.storyPlayerInfo.storyPlayed.storyId}.m4a`;

      whoosh = new Sound(localSong, '', (error) => {
        if (error) {
          console.log('sound play error', error);
          return;
        } else{
          this.setState({
            maxTime: whoosh.getDuration(),
            totalTime: whoosh.getDuration(),
          });
          timer = 0;
          whoosh.play((success) => {
            if (success) {
              dispatch(storyPlayingStatus(false));
              this.setState({ isPlaying: !this.state.isPlaying });
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
          dispatch(storyPlayingStatus(!this.state.isPlaying));
          this.setState({isPlaying: !this.state.isPlaying});
          this.getTimerCountDown(this.state.totalTime);
        }
      });
    } else {
      whoosh.play();
      whoosh.getCurrentTime((seconds) => {
        timer = parseInt(seconds);
        this.setState({
          maxTime: whoosh.getDuration(),
          totalTime: whoosh.getDuration(),
          currentTime: parseInt(seconds)

        });
        if(storyPlayerInfo.isQueuePlayed === true) {
          this.setState({
            queueList: storyPlayerInfo.queueList,
            queueIndex: storyPlayerInfo.queueIndex
          });
        }
        this.setState({isPlaying: true});
        dispatch(storyPlayingStatus(true));
        this.getTimerCountDown(this.state.totalTime);
      });
    }
  };



  componentWillUnmount() {
    clearInterval(intervalId);
  };


  onPressPlayBtn = () => {

    if (this.state.isPlaying !== false) {
      whoosh.stop();
      whoosh.release();
    } else {

      whoosh.play((success) => {
        if (success) {
          whoosh.setCurrentTime(0);
          whoosh.play()

        } else {
           console.log('playback failed due to audio decoding errors');
        }
      });
      const { store: { dispatch } } = this.context;
      dispatch(storyPlayingStatus(!this.state.isPlaying));
      this.setState({
        isPlaying: !this.state.isPlaying,
      });

    }
    this.getTimerCountDown(this.state.maxTime);

  };


  async getTimerCountDown(totaltime) {

    if (intervalId === undefined) {
      intervalId = 0;
    }
    clearInterval(intervalId);
    console.log('Slider', totaltime);
      intervalId = setInterval(() => {
        timer += 1;
        if(totaltime) {
          this.setState({totalTime: (totaltime - timer)});
          this.setState({currentTime: (timer)});
        }
        if (this.state.totalTime <= 0) {
          clearInterval(intervalId);
          timer = 0;
          this.setState({currentTime: (timer)});
          this.setState({totalTime: whoosh.getDuration()});
          if(this.state.isRepeat) {
            this.getTimerCountDown(this.state.maxTime);
          } else {
            clearInterval(intervalId);
            const { store: { dispatch } } = this.context;
            dispatch(storyPlayingStatus(!this.state.isPlaying));
            this.setState({ isPlaying: !this.state.isPlaying });
            whoosh.stop()
            //this.onPressPauseBtn();
          }

        }
      }, 1000);
  };

  onPresscircleRatingBtn = () => {
    this.setState({ isRating: true });
    this.refs.ratingView.openRatingModel( true, this.state.story );
  };


  onPressPauseBtn = () => {
    const { store: { dispatch } } = this.context;
    dispatch(storyPlayingStatus(!this.state.isPlaying));
    this.setState({ isPlaying: !this.state.isPlaying });
    clearInterval(intervalId);
    whoosh.pause();
  };


  onPressRepeateBtn = () => {
    this.setState({isRepeat: !this.state.isRepeat});
    if(this.state.isRepeat) {
      whoosh.setNumberOfLoops(-1)
    } else {
      whoosh.setNumberOfLoops(0)
    }

  };

  onSlidingChange = (value) => {
    whoosh.setCurrentTime(value);
    timer = parseInt(value);
  };

 displayQueueList =  () => {
   NavActions.queueList({
     callback: this.getQueueInfo,
   });
 };

  getQueueInfo = (arg, argList, index) => {
    whoosh = undefined;
    console.log('Index : ',index);
    this.setState({
      isQueueStoryPlay: arg,
      queueList: argList,
      queueIndex: index,
      sliding: false,
      totalTime: 0,
      isPlaying: false,
      songDuration: 0,
      currentTime: 0,
      valuePercentage: 0,
      maxTime: 0,
      story: argList[index]
    });

    if (whoosh !== undefined) {
      whoosh.stop();
      whoosh.release();
      this.setState({
        maxTime: 0,
        totalTime: 0,
      })
    }
    let storyId = argList[index].storyId;
    clearInterval(intervalId);
    const localSong = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${storyId}.m4a`;
    this.queueListPlayed(localSong);

  };

  render() {
    const { likeStoryList } = this.props;
    const { isRepeat } = this.state;
    const kahaani = this.state.story;
    let songPercentage;
    if( this.state.currentTime !== undefined){
      songPercentage = this.state.currentTime ;
    } else {
      songPercentage = 0;
    }

    let isLiked = false;
    let likedList = likeStoryList.filter((story) => story.storyId === kahaani.storyId);
    if(likedList.length === 1) {
      isLiked = likedList[0].isLiked
    }

    const rate = [];
    for(let i = 0; i < 5; i++){
      if(kahaani.rating > i) {
        rate.push(
          <View key = {i}>
            <View>
              <Icon name='md-star' style={{color: '#FFC118', fontSize: 14}} />
            </View>
          </View>
        )
      } else {
        rate.push(
          <View key={i}>
            <View>
              <Icon name='ios-star-outline' style={{ color: '#FFC118', fontSize: 14 }}/>
            </View>
          </View>
        )
      }
    }
    return(
      <View style={styles.playerContainer}>

        <Image style={styles.playerBackgroundHeader} source={Images.allstorybackgroundimage}>
          <Row style={styles.rowViewStyle}>
            <Col style={styles.colViewStyle}>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 20 }}
                onPress={this.onPressCloseBtn}>
                <Icon name="md-close" style={{ color: Colors.circleBorderColor, backgroundColor: Colors.transparent }} />
              </TouchableOpacity>
            </Col>
            <Col style={styles.colViewStyle}>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginRight: 20 }}
                onPress={this.displayQueueList}>
                <Icon name="ios-list" style={{ color: Colors.circleBorderColor, fontSize: 40, backgroundColor: Colors.transparent }} />
              </TouchableOpacity>
            </Col>
          </Row>
          <View style={styles.circleTextViewStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.circleViewStyle}
              onPress={this.onPresscircleRatingBtn}>
              <Text style={styles.discriptionTitleTextStyle}>Rate it song</Text>
              <Text style={styles.playTitleTextStyle}>{kahaani.title}</Text>
              <Text style={styles.discriptionTitleTextStyle}>{kahaani.description}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                {rate}
              </View>
            </TouchableOpacity>
          </View>
        </Image>

        <View style={{flex: 1 }}>
          <View style={ styles.sliderContainer }>
            <Slider
              style={ styles.slider}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              value={ songPercentage }
              onValueChange={ this.onSlidingChange}
              minimumTrackTintColor={ Colors.BaseColor }
              maximumValue={this.state.maxTime}
            />
            <View style={ styles.timeInfo }>
              <Text style={ styles.startTime }>{ formattedTime(this.state.currentTime)  }</Text>
              <Text style={ styles.timeRight }>- { formattedTime(this.state.totalTime) }</Text>
            </View>
          </View>
          <View style={{ flex: 0.6, marginTop: - 40 }}>
            <Row style={{ flex: 1, alignItems: 'center'}}>
              <Col style={{ flex: 0.14, alignItems: 'center'}}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={{ flex: 1, justifyContent: 'center' }}
                  onPress={this.onPressRepeateBtn}>
                  <Icon name="md-repeat" style={{color: isRepeat ? Colors.BaseColor : Colors.iconGreyColor}} />
                </TouchableOpacity>
              </Col>

              <Col style={{ flex: 0.14, alignItems: 'flex-end' }}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={styles.btnStyle}
                  onPress={this.onPressPreviousBtn}>
                  <Image style={styles.nextBtnStyle} source={Images.playerpreviousicon} />
                </TouchableOpacity>
              </Col>

              <Col style={{ flex: 0.4, alignItems: 'center'}}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={styles.btnStyle}
                  onPress={(this.state.isPlaying === false) ? this.onPressPlayBtn : this.onPressPauseBtn }>
                  {(this.state.isPlaying === false) ?
                    <Image style={styles.playBtnStyle} source={Images.playersoundplayicon} />:
                    <Image style={styles.playBtnStyle} source={Images.playersoundpauseicon} />
                  }
                </TouchableOpacity>
              </Col>

              <Col style={{ flex: 0.14, alignItems: 'flex-start'}}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={styles.btnStyle}
                  onPress={this.onPressNextBtn}>
                  <Image style={styles.nextBtnStyle} source={Images.playernexticon} />
                </TouchableOpacity>
              </Col>

              <Col style={{ flex: 0.14, alignItems: 'center'}}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={styles.btnStyle}
                  onPress={this.onPressLikeBtn}>
                  <Icon name="md-heart" style={{color: isLiked ? Colors.BaseColor : Colors.iconGreyColor}} />
                </TouchableOpacity>
              </Col>
            </Row>
          </View>
        </View>
        <RatingView ref="ratingView" />
      </View>
    );
  }
}

//TODO: Move this to a Utils file
function withLeadingZero(amount){
  if (amount < 10 ){
    return `0${ amount }`;
  } else {
    return `${ amount }`;
  }
}

function formattedTime( timeInSeconds ){
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if( isNaN(minutes) || isNaN(seconds) ){
    return "";
  } else {
    return(`${ withLeadingZero( minutes ) }:${ withLeadingZero( seconds.toFixed(0) ) }`);
  }
}

export default connect(state => ({
  likeStoryList: state.myStories.myLikeResponded,
  storyPlayerInfo: state.storyPlayer,
  queueListData: state.queue.queueList,
}))(Playerview)


