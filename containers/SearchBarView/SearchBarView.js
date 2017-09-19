import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  NetInfo,
  ToastAndroid,
} from 'react-native';

import { Colors, Fonts, Images, Metrics } from '../../theme';
import styles from './SearchBarViewStyle';
import { Actions as NavActions } from 'react-native-router-flux';
import { InputGroup, Input, Icon, List, ListItem } from 'native-base';
import Modal from 'react-native-simple-modal';
import { TopStoriesRow } from '../../components';
import { search, updateSearchList } from '../../redux/modules/search';
import { getWishList } from '../../redux/modules/wishlist';
import { getDownLoadStatus, downLoadStory } from '../../helpers/Download';
import config from '../../config/appconfig';
import SnackBar from 'react-native-snackbar-dialog';
import { connect } from 'react-redux';



class SearchBarView extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    searchdata: PropTypes.any,
    myWishList: PropTypes.any,
    myProfile: PropTypes.any,
    storyPlayerInfo: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      // isRecord: false,
      open: false,
      search: undefined,
      isClean: false,
      record: undefined,
    };
  }

  // internet connection

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

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
    const { store: { dispatch }} = this.context;
    dispatch(getWishList());
  }

  componentWillUnmount(){
    const { store: { dispatch }} = this.context;
    dispatch(updateSearchList());
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  }

  // onPressRecordBtn = () => {
  //   // this.setState({ isRecord: true });
  //   this.setState({open: true});
  // };

  showPlayerView = () => {
    NavActions.playerview({ isNext: false });
  };

  onPressClearBtn = () => {
     this.setState({ search: '' });
    const { store: { dispatch }} = this.context;
    dispatch(updateSearchList());
    Keyboard.dismiss();
  };

  focusNextField = (text) => {
    if(text !== ''){
      new Promise((resolve, reject) => {
        const {store: {dispatch}} = this.context;
        dispatch(search(this.state.search))
          .then((res) => {
              this.setState({ record: res});
              console.log('record =======================>> ',this.state.record);
            resolve();
          }).catch((ex) => {
          console.log('error', ex);
          reject();
        });
      });
    }
    else
    {
      const {store: {dispatch}} = this.context;
      dispatch(updateSearchList());
    }
  };

  render() {
    const { storyPlayerInfo, searchdata } = this.props;
    const { record } = this.state;
      return (
        <View style={styles.searchContainer}>
          <View style={styles.navigationBar}>
            <TouchableOpacity
              style={(Platform.OS === 'ios') ? { flex: 0.1, marginTop: 5, justifyContent: 'center' } : { flex: 0.1, justifyContent: 'center' }}
              onPress={()=> NavActions.drawer({type: "reset"})}>
              <Image style={{ width: 20, height: 15, resizeMode: 'contain', marginLeft: 5 }}
                     source={Images.navigationbackbuttonicon}/>
            </TouchableOpacity>

            <InputGroup
              theme={{ borderType: 'regular' }}
              style={(Platform.OS === 'ios') ? { marginTop: 10, flex: 0.9} : {flex: 0.9}}>
              <Input
                style={{
                 fontSize:Fonts.size.regular,
                 fontFamily: Fonts.Walkthrough.medium,
                 color: Colors.white,
              }}
                autoCorrect={false}
                placeholder="Search for story"
                placeholderTextColor='#F9D0B5'
                textStyle={{
                 justifyContent: 'center'
                }}
                returnKeyType="search"
                value={this.state.search}
                onChangeText={(search) => this.setState({ search })}
                onSubmitEditing={(search) => this.focusNextField(search)}
                clearButtonMode="while-editing"
              />
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.onPressClearBtn}>
                <Icon name="md-close" style={{ fontSize: 20, paddingRight: 20, color: Colors.white }}/>
              </TouchableOpacity>
            </InputGroup>

          </View>

            <View style={{ flex: 1 }}>
              {(this.state.record !== undefined && this.state.record.message !== "No results found.") ?
                <List
                  style={{ backgroundColor: Colors.homeBackground, marginLeft: -20  }}
                  dataArray={searchdata}
                  renderRow={(item) => {
                 return(
                  <ListItem style={{ backgroundColor: Colors.white }}>
                   <TopStoriesRow topstorieslistrow={ item } />
                  </ListItem>
                );
              }}/> :
                <View style={{ marginTop: Metrics.screenHeight/4 + 20, justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.record !== undefined && <Text style={{ fontSize: Fonts.size.h1, fontFamily: Fonts.Walkthrough.regular, color: Colors.BaseColor, fontWeight: '600' }}>Data not found</Text>}
                </View>
              }

              { storyPlayerInfo.storyPlayed !== null &&
              <TouchableOpacity style={styles.playerButton} onPress={this.showPlayerView}>
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
            </View>
        </View>
      );
    }

}

export default connect((state) => ({
  myWishList: state.wishlist.wishListData,
  searchdata: state.search.filter,
  myProfile: state.profile,
  storyPlayerInfo: state.storyPlayer,
}))(SearchBarView)