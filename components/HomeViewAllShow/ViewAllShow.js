/**
 * Created by ph-266 on 05/06/17.
 */

import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';
import { List, ListItem, Grid, Row, Col } from 'native-base';
import { getnewstorieslist } from '../../redux/modules/homeAuth';
import { CategoriesRow } from '../../components';
import { connect } from 'react-redux';
import { Metrics } from '../../theme';

class ViewAllShow extends Component {

  static  propTypes = {
    dispatch: PropTypes.func,
    viewAll: PropTypes.any,
    userId: PropTypes.any
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
    const { viewAll } = this.props;
    let viewAllList = [];
    if( viewAll !== null){
      viewAllList = viewAll;
    }

    let index = 0;
    let products = [];
    let viewAllRowItems = [];
    if(viewAll) {
      for (index; index < viewAll.length; index+=2) {
        viewAllRowItems.push(viewAll[index]);
        if ((index + 1) < viewAllList.length) {
          viewAllRowItems.push(viewAll[index + 1]);
        }
        products.push({ viewAllItems: viewAllRowItems });
        viewAllRowItems = [];
      }
    }

    return (
      <List
        style={{ marginTop: Metrics.navBarHeight }}
        dataArray={products}
        renderRow={(item, sectionID, rowID) => {
            return(
              <Grid>
                  <Row>
                    <Col style={{ marginRight: -10, marginBottom: -5, marginTop: -5 }}>
                      <ListItem>
                        <CategoriesRow product={item.viewAllItems[0]} stories={this.props.viewAll} rowID="0" />
                      </ListItem>
                    </Col>
                    { item.viewAllItems.length > 1 &&
                      <Col style={{ marginLeft: -10, marginTop: -5, marginBottom: -5 }}>
                        <ListItem>
                          <CategoriesRow product={item.viewAllItems[1]} stories={this.props.viewAll} rowID="1"/>
                        </ListItem>
                      </Col>
                    }
                   </Row>
                </Grid>
            );
           }}
      />
    )
  }
}

export default connect((state) => ({
  viewAll: state.homeAuth.NewstoriesResponded,
  profileData: state.profile,
}))(ViewAllShow)