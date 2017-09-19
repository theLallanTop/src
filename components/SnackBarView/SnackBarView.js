import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import SnackBar from 'react-native-snackbar-dialog';

export default class SnackBarView extends Component {


  onPress = () => {
    SnackBar.add('Making the world happier', {
      renderContent: () =>
        <View>
          <Text>Hello!</Text>
        </View>
    })
  };

  render() {
    return (
      <Text
        style={{ justifyContent: 'center', alignItems: 'center', padding: 100 }} onPress={this.onPress}
      >
        Open SnackBar
      </Text>
    )
  }
}