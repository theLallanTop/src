import React, { Component, PropTypes } from 'react';
import { View ,Text, TouchableOpacity, NativeModules } from 'react-native';
import { Icon } from 'native-base';
import { Colors } from '../../theme';
import styles from './BankListRowStyles';
import { Actions as NavActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectedpaymentInfo } from '../../redux/modules/payment';
class BankListRow extends Component {

  static propTypes = {
    name: PropTypes.any,
    selectedBank: PropTypes.any,
    paymentInfo: PropTypes.any,
    evalData: PropTypes.any,
  };

  static contextTypes = {
    store: PropTypes.object
  };

  selectingBank = () => {
    const { name, evalData } = this.props;
    const { store: { dispatch } } = this.context;
    dispatch(selectedpaymentInfo(name));
    if(name.payOptDesc === 'Net Banking' || name.payOptDesc === 'Wallet') {
      console.log('Evl : ', evalData);
      NavActions.web({evalData: evalData });
    } else {
      NavActions.pop();
    }

  };

  render() {
    // console.log('paymentInfo ===>>>', this.props.paymentInfo);
    const { name, paymentInfo } = this.props;
    let selectedBank = false;
    if(paymentInfo.selectedPaymentInfo !== null) {
      if(paymentInfo.selectedPaymentInfo.cardName === name.cardName) {
        selectedBank = true;
      }
    }

    return (
      <View style={styles.bankListRowContainer}>
        <TouchableOpacity
          style={styles.rowButtonStyle}
          onPress={this.selectingBank}
        >
        <View style={styles.bankRowTextViewStyle}>
        <Text>
          {name.cardName}
        </Text>
          </View>
          { selectedBank && <View style={styles.bankrowIconViewStyle}>
            <Icon name="md-checkmark" style={{ fontSize: 15, color: Colors.BaseColor }}/>
          </View>
          }
          </TouchableOpacity>
      </View>
    )
  }
}

export default connect(state => ({
  paymentInfo: state.payment
}))(BankListRow)
