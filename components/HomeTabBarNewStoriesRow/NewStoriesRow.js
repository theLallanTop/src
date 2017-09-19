import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './NewStoriesRowStyle';
import { Colors, Fonts } from '../../theme';
import { Actions as NavActions } from 'react-native-router-flux';
export default class NewStoriesRow extends Component {

  static propTypes = {
    stories: PropTypes.any,
    product: PropTypes.any,
    rowID: PropTypes.any,
  };
  onPressStoriesButton = (id) => {
    console.log('Stories id ',this.props.stories[id])
    NavActions.categoriesitemlist({Categories_Kahaani:this.props.stories[id]});
  }

  render() {
    const { stories } = this.props;
    const rowId = this.props.rowID;
    const storiesrow = this.props.stories;
    let selectedColor;
    let frequency = rowId %3;
    switch (frequency) {
      case 0:
        selectedColor = Colors.yellowLightColor;
        break;
      case 1:
        selectedColor = Colors.skyColor;
        break;
      case 2:
        selectedColor = Colors.BaseColor;
        break;
      default:
        break;
    }

    return(
      <View style={styles.newStoryRowContainer}>
        <TouchableOpacity
            underlayColor={Colors.cloud}
            style={styles.rowViewStyle}
            onPress={this.onPressStoriesButton.bind(this, rowId)}>
          <View style={[styles.rowSubViewStyle,{backgroundColor: selectedColor}]}>
            <Text style={[{color: Colors.white }, styles.textStyle]}>{storiesrow[rowId].title.toUpperCase()}</Text>
          </View>
          <View style={styles.subTitleTextViewStyle}>
            <Text style={styles.subTitleTextStyle}>{storiesrow[rowId].titleLower.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}