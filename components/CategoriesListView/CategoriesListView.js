import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { List, ListItem, Grid, Row, Col } from 'native-base';
import { } from '../../theme';
import config from '../../config/appconfig'
import { CategoriesRow } from '../../components';
import { connect } from 'react-redux';
import { getcategorieslist } from '../../redux/modules/homeAuth';
import styles from './CategoriesListViewStyle';


class CategoriesListView extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    categaries: PropTypes.any,
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    const { store: { dispatch }} = this.context;
    dispatch(getcategorieslist());
  }

  render() {

    const { categaries } = this.props;
    let categarieslist = [];
    if(categaries !== null){
      categarieslist = categaries;
    }
    let index = 0;
    let products = [];
    let categoresRowItems = [];
    if(categaries) {
      for (index; index < categaries.length; index+=2) {
        categoresRowItems.push(categaries[index]);
        if ((index + 1) < categarieslist.length) {
          categoresRowItems.push(categaries[index + 1]);
        }
        products.push({ categoriesItems: categoresRowItems });
        categoresRowItems = [];
      }
    }
    return (
        <List
           dataArray={products}
           renderRow={(item, sectionID, rowID) => {
            return(
              <Grid>
                  <Row>
                    <Col style={{ marginRight: -10, marginBottom: -5, marginTop: -5 }}>
                      <ListItem>
                        <CategoriesRow product={item.categoriesItems[0]} stories={this.props.categaries} rowID="0" />
                      </ListItem>
                    </Col>
                    { item.categoriesItems.length > 1 &&
                      <Col style={{ marginLeft: -10, marginTop: -5, marginBottom: -5 }}>
                        <ListItem>
                          <CategoriesRow product={item.categoriesItems[1]} stories={this.props.categaries} rowID="1"/>
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
  categaries: state.homeAuth.CategoriesResponded,
}))(CategoriesListView)