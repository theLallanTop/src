import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableOpacity,
  Platform,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import styles from './TopStoriesStyle';
import { Images, Fonts, Colors, Metrics } from '../../theme';
import { TopStoriesRow, MyAllStoriesListRow, MoreActivityView} from '../../components';
import { connect } from 'react-redux';
import { gettopstories, getfreestories, getfreestoriesnewest, getfreestoriesoldest, gettopstoriesnewest, gettopstoriesoldest, dataclearwithunmount } from '../../redux/modules/stories';
import { getmylikelist, getmystorieslist, recentDownload } from '../../redux/modules/myStories';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Badge, Col, Icon, List, ListItem, Row } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../../config/appconfig';
import { getprofiledetails } from '../../redux/modules/profile';
import { getWishList } from '../../redux/modules/wishlist';
const PARALLAX_HEADER_HEIGHT = 240;
const STICKY_HEADER_HEIGHT = 100;
import { Actions as NavActions, ActionConst } from 'react-native-router-flux';

let header;


class TopStories extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    navigationState: PropTypes.object,
    topstories: PropTypes.any,
    myStories: PropTypes.any,
    myWishList: PropTypes.any,
    profileData: PropTypes.any,
    queueListData: PropTypes.any,
    storyPlayerInfo: PropTypes.any,
  };

  static contextTypes = {
    store: PropTypes.object
  };


  loaddata = async () => {
    const { profileData } = this.props;
    const { store: { dispatch }} = this.context;

    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }
    header = this.props.Header;
    switch (header) {
      case 'Free Stories':
        // dispatch(getfreestoriesnewest((this.state.page),(profileData.profile !== null ? profileData.profile.id : null)));

        this.onPressFreeNewestButton();

        break;
      case 'Top Stories':
        // dispatch(gettopstoriesnewest((this.state.page),(profileData.profile !== null ? profileData.profile.id : null)));
        this.onPressTopNewestButton();
        break;
      case 'All Stories':
        dispatch(getmystorieslist());
        break;
      case 'My Likes':
        dispatch(getmylikelist());
        break;
      case 'Recent Downloads':
        dispatch(recentDownload());
        break;
      default:
        break;
    }
  };


  loadmore = async () => {
    const { profileData } = this.props;
    const { storiesType } = this.state;
    const { store: { dispatch }} = this.context;

    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }
    header = this.props.Header;
    switch (header) {
      case 'Free Stories':
        if(storiesType ==='FreeStoryOldest'){
          dispatch(getfreestoriesoldest((this.state.page),(this.state.userId)));
        }else {
          dispatch(getfreestoriesnewest((this.state.page),(this.state.userId)));
        }
        break;
      case 'Top Stories':
        if(storiesType ==='TopStoryNewest'){
          dispatch(gettopstoriesnewest((this.state.page),(this.state.userId)));
        }else {
          dispatch(gettopstoriesoldest((this.state.page),(this.state.userId)));
        }
        break;
      case 'My Likes':
        dispatch(getmylikelist());
        break;
      default:
        break;
    }

  };

  async componentWillMount() {
    this.loaddata();
  }

  componentWillUnmount() {
    const { store: { dispatch }} = this.context;
    dispatch(dataclearwithunmount());
  }

  constructor() {
    super();
    this.state = {
      isNewest: false,
      moreViewOpen: false,
      storyData: null,
      refreshing: false,
      sort: 'latest',
      page: 0,
      // pageForSegmentNewestCount: 0,
      // pageForSegmentOldestCount: 0,
      userId: null,
      storiesType: undefined,
    };
  }

  onPressTopNewestButton = () => {
    const { profileData, topstories } = this.props;
    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }else {
      this.setState({ userId: null});
    }
    if(topstories.TopNewStories === null || topstories.TopNewStories === undefined){
      const { store: { dispatch }} = this.context;
      this.setState({isNewest: false, storiesType:'TopStoryNewest'}, () => {
        dispatch(gettopstoriesnewest((this.state.page),(this.state.userId)));
      });
    }else{
      this.setState({isNewest: false, storiesType:'TopStoryNewest'});
    }
  };

  onPressTopOldestButton = () => {
    const { profileData, topstories } = this.props;
    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }else {
      this.setState({ userId: null});
    }
    if(topstories.TopOldStories === null || topstories.TopOldStories === undefined) {
      const {store: {dispatch}} = this.context;
      this.setState({isNewest: true, storiesType: 'TopStoryOldest'}, () => {
        dispatch(gettopstoriesoldest((this.state.page), (this.state.userId)));
      });
    }else {
      this.setState({isNewest: true, storiesType: 'TopStoryOldest'});
    }
  };

  onPressFreeOldestButton = () => {
    const { profileData, topstories } = this.props;
    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }else {
      this.setState({ userId: null});
    }
    if(topstories.FreeOldStories === null || topstories.FreeOldStories === undefined) {
      const {store: {dispatch}} = this.context;
      this.setState({isNewest: true, storiesType: 'FreeStoryOldest'}, () => {
        dispatch(getfreestoriesoldest((this.state.page), (this.state.userId)));
      });
    } else {
      this.setState({isNewest: true, storiesType: 'FreeStoryOldest'});
    }
  };

  onPressFreeNewestButton = () => {
    const { profileData, topstories } = this.props;
    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }else {
      this.setState({ userId: null});
    }
    if(topstories.FreeNewStories === null || topstories.FreeNewStories === undefined) {
      const {store: {dispatch}} = this.context;
      this.setState({isNewest: false, storiesType: 'FreeStoryNewest'}, () => {
        dispatch(getfreestoriesnewest((this.state.page), (this.state.userId)));
      });
    }else {
      this.setState({isNewest: false, storiesType: 'FreeStoryNewest'});
    }
  };

  onPressBackButton = () => {
    NavActions.drawer({type: "reset"});
  };

  showModalView = (isOpen, storyData) => {
    const { myStories, queueListData  } = this.props;
    this.refs.moreActivityView.openModel(storyData, myStories.myLikeResponded, queueListData.queueList );
  };

  renderStickyHeader = () =>  {
    if(header === 'All Stories' || header === 'Recent Downloads'){
      return(
        <View key="sticky-header" style={styles.allStoryStickySection}>
          <Row style={styles.topStoriesStickerViewStyle}>
            <Text style={styles.TitleTextVisualStyle}>{header}</Text>
          </Row>
        </View>
      );
    }else {
      return(
          <View key="sticky-header" style={styles.stickySection}>
            <Col style={styles.topStoriesStickerViewStyle}>
              <Text style={styles.TitleTextVisualStyle}>{header}</Text>
            </Col>
            <Col style={styles.stickerHeaderButtonViewStyle}>
              <Row style={styles.topStoriesOldestButtonViewStyle}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={
                          (this.state.isNewest !== true ) ?
                            styles.leftTopStoriesDeactiveButtonStyle :
                            styles.leftTopStoreisActiveButtonStyle
                  }
                  onPress={(header !== 'Top Stories') ? this.onPressFreeNewestButton : this.onPressTopNewestButton}>
                  <Text style={
                          (this.state.isNewest !== true ) ? styles.buttonTextStyle : styles.activeButtonTextStyle
                        }>NEWEST</Text>
                </TouchableOpacity>
              </Row>
              <Row style={styles.topStoriesOldestButtonViewStyle}>
                <TouchableOpacity
                  underlayColor = {Colors.cloud}
                  style={
                          (this.state.isNewest === false ) ? styles.rightTopStoreisActiveButtonStyle : styles.rightTopStoriesDeactiveButtonStyle
                        }
                  onPress={(header !== 'Top Stories') ? this.onPressFreeOldestButton : this.onPressTopOldestButton }>
                  <Text style={
                          (this.state.isNewest === false ) ? styles.activeButtonTextStyle : styles.buttonTextStyle
                        }>OLDEST</Text>
                </TouchableOpacity>
              </Row>
            </Col>
          </View>
        );
    }
  };

  renderForeground = () =>  {
    return (
      <View key="parallax-header" style={ styles.parallaxHeader }>
        <Text style={ styles.sectionSpeakerText }>
          {header}
        </Text>
      </View>
    );
  };

  renderBackground = () =>  {
    return (
      <View key="background">
        <Image
          source={(header === 'All Stories') ? Images.allstorybackgroundimage : Images.topstorybackgroundimage}
          style={{
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT}}/>
        <View
          style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: Colors.BaseColor,
                    height: PARALLAX_HEADER_HEIGHT}}
        />
      </View>
    );
  };

  renderFixedHeader = () => {
    return (
      <View key="fixed-header" style={styles.fixedSection}>

        <Row style={(header !== 'All Stories' && header !== 'Recent Downloads') ? styles.fixedSectionButtonView : styles.fixedAllStroySectionButtonView}>
          <Col style={styles.fixedSectionBackButtonStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={{ height: 32, width: 32 }}
              onPress={this.onPressBackButton}>
              <Image style={{ width: 20, height: 15, resizeMode: 'contain', marginLeft: 5 }} source={Images.navigationbackbuttonicon} />
            </TouchableOpacity>
          </Col>
          <Col style={styles.fixedSectionRightButtonStyle}>
            <Row>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={{ height: 24, width: 28, marginTop: 20, marginLeft: 10 }}
                onPress={()=> NavActions.searchbarview()}>
                <View style={{ alignItems: 'center', justifyContent:'center'}}>
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.searchicon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={{ height: 24, width: 28, marginTop: 20, marginLeft: 10 }}
                onPress={()=> console.log('')}>
                <View style={{ alignItems: 'center', justifyContent:'center'}}>
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.notificationicon} />
                </View>
              </TouchableOpacity>
            </Row>
          </Col>
        </Row>
      </View>
    );
  };

  showPlayerView = () => {
    NavActions.playerview({ isNext: false });
  };

  onPressLoadmoreBtn = () => {
    this.setState({
        page: this.state.page + 1,
      }, () => {
        this.loadmore();
      });
  };


  render() {
    const { topstories, myStories, storyPlayerInfo, isLoad  } = this.props;
    const { storiesType, storiesSort } = this.state;
    // console.log('isLoad =====>>>>>',isLoad);

    let storieslist = [];
    if(header === 'My Likes')
    {
      let likeList = myStories.myLikeResponded;
      for(let index = 0; index< likeList.length; index ++) {
        if(likeList[index].isLiked === true)
        {
          storieslist.push(likeList[index]);
        }
      }
    } else if(header === 'All Stories' || header === 'Recent Downloads') {
       storieslist = myStories.myStoriesResponded;
    }
    else {
      if(storiesType === 'FreeStoryNewest'){
        storieslist = topstories.FreeNewStories;
      }else if(storiesType === 'FreeStoryOldest'){
        storieslist = topstories.FreeOldStories;
      }else if(storiesType === 'TopStoryOldest'){
        storieslist = topstories.TopOldStories;
      }else if(storiesType === 'TopStoryNewest'){
        storieslist = topstories.TopNewStories;
      }
    }

    const { onScroll = () => {} } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <List
          style={{
           flex: 1,
           marginTop: 100,
           backgroundColor: Colors.transparent
         }}
          enableEmptySections={true}
          dataArray={storieslist}
          renderRow={(rowData, sectionID, rowID) =>
          {
             switch (header) {
               case 'Free Stories':{
                  return(
                     <ListItem style={{ backgroundColor: Colors.white }}>
                        <TopStoriesRow topstorieslistrow={ rowData } myWishList={this.props.myWishList} />
                     </ListItem>
                  );
                break;
                }
               case 'Top Stories':{
                  return(
                     <ListItem style={{ backgroundColor: Colors.white }}>
                        <TopStoriesRow topstorieslistrow={ rowData } myWishList={this.props.myWishList}/>
                     </ListItem>
                  );
                break;
                }
               case 'All Stories': {
                  return(
                    <ListItem style={{ backgroundColor: Colors.white }}>
                      <MyAllStoriesListRow
                        allstorieslistrow={ rowData }
                        isQueue={false}
                        onPress={(isMore, storyData) => this.showModalView(isMore, storyData)}
                      />
                    </ListItem>
                  );
                break;
                }
               case 'My Likes': {
                 return (
                    <ListItem style={{ backgroundColor: Colors.white }}>
                      <TopStoriesRow topstorieslistrow={ rowData } myWishList={this.props.myWishList} myLike={header} />
                    </ListItem>
                 )
               }

               case 'Recent Downloads': {
                 return (
                    <ListItem style={{ backgroundColor: Colors.white }}>
                      <TopStoriesRow topstorieslistrow={ rowData } myWishList={this.props.myWishList}  />
                    </ListItem>
                 )
               }

               default:
                break;
             }
            }
          }
          renderScrollComponent={props => (
            <ParallaxScrollView
             onScroll={onScroll}
             headerBackgroundColor={Colors.BaseColor}
             stickyHeaderHeight={(header === 'All Stories' || header === 'Recent Downloads') ? STICKY_HEADER_HEIGHT /2 + 20 : STICKY_HEADER_HEIGHT}
             parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
             backgroundSpeed={10}
             renderBackground={ this.renderBackground.bind(this) }
             renderForeground={ this.renderForeground.bind(this) }
             renderStickyHeader={ this.renderStickyHeader.bind(this) }
             renderFixedHeader={ this.renderFixedHeader.bind(this) }
           />
        )}
          renderFooter={() => ((storieslist.length !== 0 && storieslist.length % 10 === 0) &&
            <View style={styles.containerFooter}>
              <TouchableOpacity style={styles.button} onPress={() => this.onPressLoadmoreBtn()}>
                <Text style={styles.text}>Load More</Text>
              </TouchableOpacity>
            </View>
          )}
        />

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
        { header === 'All Stories' &&  <MoreActivityView ref="moreActivityView" />}
      </View>
    );
  }
}

export default connect(state =>({
  topstories: state.stories,
  myStories: state.myStories,
  myWishList: state.wishlist.wishListData,
  profileData: state.profile,
  queueListData: state.queue,
  storyPlayerInfo: state.storyPlayer,
}))(TopStories)
