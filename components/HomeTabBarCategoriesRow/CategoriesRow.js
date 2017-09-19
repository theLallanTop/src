import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './CategoriesStyle';
import { Colors } from '../../theme';
import { Grid, Col, Row, Button } from 'native-base';
import { Actions as NavActions } from 'react-native-router-flux';
export default class CategoriesRow extends Component {

  static propTypes = {
    stories: PropTypes.any,
    product: PropTypes.any,
    rowID: PropTypes.any,
  };
  onPressStoriesButton =() => {
    NavActions.categoriesitemlist({Categories_Kahaani:this.props.product});
  };

  render() {
    const rowNumber = this.props.rowID;
    let rowColor;
    if (rowNumber === '0') {
      rowColor = Colors.BaseColor;
    }else {
      rowColor = Colors.skyColor;
    }
    return(
      <View style={styles.categoriesRowContainer}>
          <Row style={styles.gridViewStyle}>
            <TouchableOpacity
              underlayColor={Colors.cloud}
              style={[styles.leftButtonStyle, {backgroundColor:rowColor}]}
              onPress={this.onPressStoriesButton}>
              <Text style={styles.textTitleStyle}>{this.props.product.title.toUpperCase()}</Text>
              <Text style={styles.textTitleStyle}>_</Text>
              <Text numberOfLines={2} style={styles.discriptionTitleStyle}>{this.props.product.description.toUpperCase()}</Text>
            </TouchableOpacity>
          </Row>
      </View>
    );
  }
}