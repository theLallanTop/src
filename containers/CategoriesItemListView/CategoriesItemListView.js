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
  Platform
} from 'react-native';
import styles from './CategoriesItemListViewStyle';
import { Images, Fonts, Colors, Metrics } from '../../theme';
import { TopStoriesRow } from '../../components';
import { connect } from 'react-redux';
import { getcategoriesItemDetailNewest, getcategoriesItemDetailOldest } from '../../redux/modules/stories';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Badge, Col, Row, Icon, List, ListItem } from 'native-base';

const PARALLAX_HEADER_HEIGHT = 240;
const STICKY_HEADER_HEIGHT = 100;
import { Actions as NavActions } from 'react-native-router-flux';

let data;
let userId = null;
let storyTagId = null;
let sort = null;
class CategoriesItemListView extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    topstories: PropTypes.any,
    profileData: PropTypes.any,
    storyPlayerInfo: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  loaddata = () => {
    data = this.props.Categories_Kahaani;
    if(data.tagId === undefined) {
      storyTagId = data.id
    } else {
      storyTagId = data.tagId
    }
    const { profileData } = this.props;
    if(profileData.profile) {
      userId = profileData.profile.id
    }
    const { store: { dispatch }} = this.context;
    dispatch(getcategoriesItemDetailNewest(storyTagId,userId));
  };

  async componentWillMount() {
    this.loaddata();
    data = this.props.Categories_Kahaani;
  }

  // componentWillMount() {
  //   data = this.props.Categories_Kahaani;
  // }

  constructor() {
    super();
    this.state = {
      isNewest: false,
      storiesType: undefined,
      page: 0,
      storyid: undefined,
      userId: null
    };
  }

  onPressOldestButton = () => {
    const { profileData, topstories } = this.props;
    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }else {
      this.setState({ userId: null});
    }
    if(topstories.categoriesOldStories === null || topstories.categoriesOldStories === undefined){
      const { store: { dispatch }} = this.context;
      this.setState({isNewest: true, storiesType: 'OldestCategories'}, () => {
        dispatch(getcategoriesItemDetailOldest(storyTagId,(this.state.userId)));
      });
    }else{
      this.setState({isNewest: true, storiesType: 'OldestCategories'});
    }
  };

  onPressNewestButton = () => {
    const { profileData, topstories } = this.props;
    if(profileData.profile) {
      this.setState({ userId: profileData.profile.id});
    }else {
      this.setState({ userId: null});
    }
    if(topstories.categoriesNewStories === null || topstories.categoriesNewStories === undefined){
      const { store: { dispatch }} = this.context;
      this.setState({isNewest: false, storiesType: 'NewestCategories'}, () => {
        dispatch(getcategoriesItemDetailNewest(storyTagId,(this.state.userId)));
      });
    }else{
      this.setState({isNewest: false, storiesType: 'NewestCategories'});
    }
  };

  onPressBackButton = () => {
    NavActions.drawer({type: "reset"});
  };

  showPlayerView = () => {
    NavActions.playerview({ isNext: false });
  };

  onPressLoadmoreBtn = () => {
    this.setState({
        page: this.state.page + 1
      }, () => {
        this.loaddata();
      }
    );
  };


  renderStickyHeader = () =>  {
    return(
      <View key="sticky-header" style={styles.stickySection}>
        <Col style={styles.topStoriesStickerViewStyle}>
          <Text style={styles.TitleTextVisualStyle}>{data.title}</Text>
        </Col>
        <Col style={styles.stickerHeaderButtonViewStyle}>
          <Row style={styles.topStoriesOldestButtonViewStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={(this.state.isNewest !== true ) ? styles.leftTopStoriesDeactiveButtonStyle : styles.leftTopStoreisActiveButtonStyle}
              onPress={this.onPressNewestButton}>
              <Text style={(this.state.isNewest !== true ) ? styles.buttonTextStyle : styles.activeButtonTextStyle }>NEWEST</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.topStoriesOldestButtonViewStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={
                          (this.state.isNewest === false ) ? styles.rightTopStoreisActiveButtonStyle : styles.rightTopStoriesDeactiveButtonStyle
                        }
              onPress={this.onPressOldestButton}>
              <Text style={
                          (this.state.isNewest === false ) ? styles.activeButtonTextStyle : styles.buttonTextStyle
                        }>OLDEST</Text>
            </TouchableOpacity>
          </Row>
        </Col>
      </View>
    );
  };

  renderFixedHeader = () => {
    return (
      <View key="fixed-header" style={styles.fixedSection}>
        <Row style={styles.fixedSectionButtonView}>
          <Col style={styles.fixedSectionBackButtonStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.backbtnStyle}
              onPress={this.onPressBackButton}>
              <Image style={{ width: 20, height: 15, resizeMode: 'contain', marginLeft: 5 }} source={Images.navigationbackbuttonicon} />
            </TouchableOpacity>
          </Col>
          <Col style={styles.fixedSectionRightButtonStyle}>
            <Row>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={styles.searchBtnStyle}
                onPress={()=> NavActions.searchbarview()}>
                <View style={{ alignItems: 'center', justifyContent:'center'}}>
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.searchicon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={styles.notificationBtnStyle}
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
  renderForeground = () =>  {
    return (
      <View key="parallax-header" style={ styles.parallaxHeader }>
        <Text style={ styles.sectionSpeakerText }>
          {data.title}
        </Text>
      </View>
    );
  };
  renderBackground = () =>  {
    return (
      <View key="background">
        <Image
          source={(data.title === 'All Stories') ? Images.allstorybackgroundimage : Images.topstorybackgroundimage}
          style={{
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT}}
        />
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



  render() {
    const { topstories, storyPlayerInfo  } = this.props;
    let storieslist = [];
    if (topstories !== null ) {
      if (this.state.storiesType === 'OldestCategories') {
        storieslist = topstories.categoriesOldStories;
      } else {
        storieslist = topstories.categoriesNewStories;
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
            <ListItem>
             <TopStoriesRow topstorieslistrow={ rowData } myWishList={this.props.myWishList} />
            </ListItem>
          }
          /*Parallax view for image */
          renderScrollComponent={props => (
            <ParallaxScrollView
             onScroll={onScroll}
             headerBackgroundColor={Colors.BaseColor}
             stickyHeaderHeight={STICKY_HEADER_HEIGHT}
             parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
             backgroundSpeed={10}
             renderBackground={ this.renderBackground }
             renderForeground={ this.renderForeground }
             renderStickyHeader={ this.renderStickyHeader }
             renderFixedHeader={ this.renderFixedHeader }
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
    );
  }
}
export default connect((state) =>({
  topstories: state.stories,
  myWishList: state.wishlist.wishListData,
  profileData: state.profile,
  storyPlayerInfo: state.storyPlayer,
}))(CategoriesItemListView)


/*
*  <TouchableOpacity
 underlayColor = {Colors.cloud}
 style={styles.wishlistBtnStyle}
 onPress={()=> NavActions.wishlist()}>
 <View style={{ alignItems: 'center', justifyContent:'center'}}>
 <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={Images.wishlisticon} />
 </View>
 </TouchableOpacity>
 {(this.props.myWishList) && <Badge
 style={{
 marginTop: 8,
 marginLeft: -18,
 width: 23,
 height: 23,
 backgroundColor: Colors.skyColor,
 borderWidth: 0.5,
 borderColor: Colors.white,
 justifyContent: 'center',
 alignItems: 'center'
 }}
 >
 <Text style={styles.badgeTextStyle}>
 {this.props.myWishList.length}
 </Text>
 </Badge>}
 */