import React, { Component , PropTypes } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem } from 'native-base';
import { SubscribeListRow } from '../../components';
import { Colors } from '../../theme';
import styles from './StoryListViewStyle';
import { PickerView } from '../../components';
import { pickerViewUpdateStatus, paymentInfoClear, pickerViewclearValue } from '../../redux/modules/payment';
const list = [
  {
    ButtonName: 'Credit Card',
  },
  {
    ButtonName: 'Debit Card',
  },
  {
    ButtonName: 'Net Banking',
  },
  {
    ButtonName: 'Wallet',
  }
];

export default class StoryListView extends Component{

  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    const { store: { dispatch }} = this.context;
    dispatch(pickerViewUpdateStatus(false, null));
    dispatch(pickerViewclearValue());
    dispatch(paymentInfoClear());

  }
  render() {
    return(
      <View style={styles.storyContainer}>
        <List
          style={{ backgroundColor: Colors.homeBackground, marginLeft: -20 }}
          dataArray={list}
          renderRow={(item) => {
             return(
              <ListItem style={{ backgroundColor: Colors.white }}>
                <SubscribeListRow subscribeCard={item}/>
              </ListItem>
            );
          }} />
        <PickerView />
      </View>
    );
  }
}