import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, NativeModules, Alert, Platform, Picker, Item } from 'react-native';
import styles from './SubscribeListRowStyle';
import { Row, Col, Icon } from 'native-base';
import { Colors } from '../../theme';
import config from '../../config/appconfig';
const { CCAvenuePayment } = NativeModules;
import { Actions as NavActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { postPaymentOptions, selectedpaymentInfo } from '../../redux/modules/payment';
import { CardDetailsView } from '../../components';

class SubscribeListRow extends Component {

  static propTypes = {
    subscribeCard: PropTypes.any,
    paymentOptionInfo: PropTypes.any,
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      evalData: null
    }
  }


  onPressCellClickBtn = () => {
    var num = Math.floor((Math.random() * 10000) + 1);
    config.OrderId = num.toString();
    const { paymentOptionInfo, subscribeCard } = this.props;
    const {store: {dispatch}} = this.context;
    if(paymentOptionInfo.selectedPaymentInfo !== null) {
      if(paymentOptionInfo.selectedPaymentInfo.payOptDesc !== subscribeCard.ButtonName) {
        dispatch(selectedpaymentInfo(null));
      }
    }
     CCAvenuePayment.requestForPaymentOptions(config.accessCode, 'INR', '1.00', (bankRes) => {
       dispatch(postPaymentOptions(bankRes));
         if (subscribeCard.ButtonName === 'Net Banking' || subscribeCard.ButtonName === 'Wallet') {
           CCAvenuePayment.addEvent({
             accessCode: config.accessCode,
             orderId: config.OrderId,
             rsaKey: config.rsaKey,
             amount: '1.00',
             currency: 'INR',
             cvvNumber: null,
             cardNumber: null,
             nameOnCard: null,
             year: null,
             month: null,
           }, (res) => {
             console.log('Res addEvent :', res);
             if (res !== null) {
               this.setState({
                 evalData: res
               });
               let payMentSelected = bankRes.filter((paymentOpt) => paymentOpt.payOptDesc === this.props.subscribeCard.ButtonName);
               console.log('payMentSelected : ', payMentSelected);
               console.log('cardsList : ', JSON.parse(payMentSelected[0].cardsList));
               let bankArray = JSON.parse(payMentSelected[0].cardsList);
               NavActions.bankListName({ bankNameList: bankArray, evalData: res });
             } else {
               Alert.alert('Some Error occured. Please try later');
             }
           })
       } else {
           let payMentSelected = bankRes.filter((paymentOpt) => paymentOpt.payOptDesc === this.props.subscribeCard.ButtonName);
           let bankArray = JSON.parse(payMentSelected[0].cardsList);
           NavActions.bankListName({
             bankNameList: bankArray,
             evalData: null,
           });
       }
   })

  };
  render() {
    const cards = this.props.subscribeCard;
    const { paymentOptionInfo } = this.props;
    let isCard = false;
    if(paymentOptionInfo.selectedPaymentInfo !== null) {
      if(cards.ButtonName === 'Debit Card' || cards.ButtonName === 'Credit Card')
      if (paymentOptionInfo.selectedPaymentInfo.payOptDesc === cards.ButtonName) {
        isCard = true;
      }
    }
    return (
      <View style={styles.storyContainer}>
          <TouchableOpacity
            underlayColor={Colors.cloud}
            style={styles.storyRowContainer}
            onPress={this.onPressCellClickBtn}>
            <Row>
              <Col style={styles.colViewStyle}>
                <Text style={[styles.rowTextStyle, {color: isCard ? Colors.BaseColor :Colors.black}]}>{cards.ButtonName}
                </Text>
              </Col>
              <Col style={styles.arrowRowStyle}>
                <Icon name= {isCard ? "ios-arrow-down-outline" : "ios-arrow-forward-outline"}
                      style={{
                        color: isCard ? Colors.BaseColor : Colors.coal,
                        fontSize: 20 }}
                />
              </Col>
            </Row>
          </TouchableOpacity>
        {isCard && <View style={{paddingLeft: 20, marginTop: 20}}>
         <CardDetailsView data={this.state.evalData === null ? null : this.state.evalData}/>
        </View>
        }
      </View>
    );
  }
}

export default connect(state => ({
  paymentOptionInfo: state.payment
}))(SubscribeListRow)