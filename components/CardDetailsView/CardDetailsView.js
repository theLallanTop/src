import React, { Component, PropTypes } from 'react';
import { View, Text, Picker, TouchableOpacity, Platform, NativeModules } from 'react-native';
import styles from './CardDetailsViewStyles';
import { Form, Item, Label, Input, Row, Col } from 'native-base';
import { saveCardDetails, pickerViewUpdateStatus, pickerViewclearValue,  } from '../../redux/modules/payment';
import { Actions as NavActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import config from '../../config/appconfig';

const { CCAvenuePayment } = NativeModules;

class CardDetailsView extends Component {

  static propTypes = {
    data: PropTypes.any
  };


  constructor() {
    super();
    this.state = {
      nameOnCard: '',
      cardNumber: '',
      cvvNumber: '',
      expiryYear: '',
      month: '',
      errorMessage: '',
      date:"2016-05"
    };
  }
  static contextTypes = {
    store: PropTypes.object
  };


  resetAllFields = () => {
    const { store: { dispatch }} = this.context;
    dispatch(pickerViewclearValue());
    this.setState ({
      nameOnCard: '',
      cardNumber: '',
      cvvNumber: '',
      errorMessage: ''

    })
  };



  dispatchcardDetails = () => {
    const { store: { dispatch } } = this.context;
    const { paymentInfo } = this.props;
    let month = paymentInfo.month;
    let expiryYear = paymentInfo.expiryYear;
    const { nameOnCard, cardNumber, cvvNumber, errorMessage } = this.state;
    var reg = /^\d+$/;
    if(cardNumber.length && cvvNumber.length && expiryYear !== null && month !== null) {
      if(!reg.test(cardNumber)) {
        this.setState({
          errorMessage: 'Card number should be numberic'
        });
        return;
      } else if(!reg.test(cvvNumber)) {
        this.setState({
          errorMessage: 'Card number should be numberic'
        });
        return;
      } else if(!reg.test(month)) {
        this.setState({
          errorMessage: 'Month should be numberic'
        });
        return;
      }else if(!reg.test(expiryYear)) {
        this.setState({
          errorMessage: 'Year should be numberic'
        });
        return;
      }  else {
        dispatch(saveCardDetails({
          nameOnCard: nameOnCard,
          cardNumber: cardNumber,
          cvvNumber: cvvNumber,
          expiryYear: expiryYear,
          month: month
        }));

          CCAvenuePayment.addEvent({
            accessCode: config.accessCode,
            orderId: config.OrderId,
            rsaKey: config.rsaKey,
            amount: '1.00',
            currency: 'INR',
            cvvNumber: cvvNumber,
            cardNumber: cardNumber,
            month: month,
            year: expiryYear,
            nameOnCard: nameOnCard,
          },
            (res) => {
            console.log('Res addEvent :', res);
            if (res !== null) {
              this.setState({
                data: res
              });
              NavActions.web({ evalData: res })
            } else {
              Alert.alert('Some Error occured. Please try later');
            }
          })
      }
    } else if(cardNumber.length === 0) {
      this.setState({
        errorMessage: 'Please enter your card number'
      });
      return;
    } else if(cvvNumber.length === 0) {
      this.setState({
        errorMessage: 'Please enter your cvv number'
      });
      return;
    }else if(month === null || expiryYear === null) {
      this.setState({
        errorMessage: 'Please enter your expiry date'
      });
      return;
    }

    console.log(reg.test(this.state.cardNumber));
  };

  showMonthPickerView = () => {
    const { store: { dispatch }} = this.context;
    dispatch(pickerViewUpdateStatus(true, true));
  };

  showYearsPickerView = () => {
    const { store: { dispatch }} = this.context;
    dispatch(pickerViewUpdateStatus(true, false));
  };

  render() {
    return (
      <View style={styles.cardViewStyles}>
        <Form>
          <Item >
            <Input
              value={this.state.nameOnCard}
              autoCorrect={false}
              secureTextEntry={false}
              placeholder="Name On Card"
              style={{ fontWeight:'bold' }}
              onChangeText={(nameOnCard) => {
                this.setState({ nameOnCard, errorMessage: '' });
              }}/>
          </Item>
          <Item>
            <Input
              value={this.state.cardNumber}
              autoCorrect={false}
              style={{ fontWeight:'bold' }}
              placeholder="Card Number"
              onChangeText={(cardNumber) => {
                this.setState({ cardNumber, errorMessage: '' });
              }}/>
          </Item>
          <Item>
            <Input
              secureTextEntry={true}
              value={this.state.cvvNumber}
              autoCorrect={false}
              style={{ fontWeight:'bold' }}
              placeholder="CCV Number"
              onChangeText={(cvvNumber) => {
                this.setState({ cvvNumber, errorMessage: '' });
              }}/>
          </Item>
          <Row>
            <Col style={styles.monthYearColStyle}>
              <TouchableOpacity
                style={{marginBottom: 5}}
                onPress={this.showMonthPickerView}
              >
                <Text
                  style={styles.monthYearTextStyle}>
                  {this.props.paymentInfo.month !== null ? this.props.paymentInfo.month : 'Month'}
                </Text>
              </TouchableOpacity>
              </Col>
            <Col style={styles.monthYearColStyle}>
              <TouchableOpacity
                style={{marginBottom: 5}}
                onPress={this.showYearsPickerView}
              >
                <Text
                  style={styles.monthYearTextStyle}>
                  {this.props.paymentInfo.expiryYear !== null ? this.props.paymentInfo.expiryYear : 'Expiry Year'}
                </Text>
              </TouchableOpacity>
              </Col>
            </Row>
        </Form>
        <Text style={styles.errorMessageTextStyle}>
          {this.state.errorMessage}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.cardDetailsButtonStyle}
            onPress={this.dispatchcardDetails}
          >
            <Text style={styles.cardDetalsButtonTextStyle}> OK </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardDetailsButtonStyle}
            onPress={this.resetAllFields}
          >
            <Text style={styles.cardDetalsButtonTextStyle}> RESET </Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

export default connect(state => ({
  paymentInfo: state.payment
}))(CardDetailsView)
