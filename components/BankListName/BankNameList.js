import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './BankNameListStyles'
import { List, ListItem } from 'native-base';
import { BankListRow } from '../../components';
export default  class BankNameList extends Component {

  static propTypes = {
    bankNameList: PropTypes.any,
    evalData: PropTypes.any,
  };

  render() {

    return (
      <View style={styles.bankListContainer}>
        <List
          dataArray={this.props.bankNameList}
          renderRow={(item) => {
            return(
              <ListItem>
                <BankListRow name={item} evalData={this.props.evalData} />
              </ListItem>
            );
          }}/>
      </View>
    );
  }
}