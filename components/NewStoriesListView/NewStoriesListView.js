import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import { List, ListItem } from 'native-base';
import { } from '../../theme';
import { NewStoriesRow } from '../../components';
import styles from './NewStoriesListViewStyle';
import { connect } from 'react-redux';
import { getnewstorieslist } from '../../redux/modules/homeAuth';


class NewStoriesListView extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    newstories: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    const { profileData } = this.props;
    let userId = null;
    if(profileData.profile) {
      userId = profileData.profile.id
    }
    const { store: { dispatch }} = this.context;
    dispatch(getnewstorieslist(userId));
  }

  render() {
    const { newstories } = this.props;
    let newstorieslist = [];
    if (newstories !== null ){
      newstorieslist = newstories;
    }
    return(
        <List
          enableEmptySections={true}
          scrollEnabled = {true}
          horizontal = {true}
          pagingEnabled = {false}
          showsHorizontalScrollIndicator = {false}
          showsVerticalScrollIndicator = {false}
          removeClippedSubviews = {true}
          automaticallyAdjustContentInsets = {true}
          alwaysBounceVertical = {true}
          alwaysBounceHorizontal = {true}
          bouncesZoom = {false}
          canCancelContentTouches = {true}
          centerContent = {false}
          directionalLockEnabled = {true}
          dataArray={newstorieslist}
          style={{ marginLeft: 5 }}
          renderRow={(rowData, sectionID, rowID) =>{
            return(
              <NewStoriesRow stories={newstorieslist} rowID={ rowID }/>
              )
            }
          }
        />
    );
  }
}
export default connect((state) => ({
  newstories: state.homeAuth.NewstoriesResponded,
  profileData: state.profile,
}))(NewStoriesListView)