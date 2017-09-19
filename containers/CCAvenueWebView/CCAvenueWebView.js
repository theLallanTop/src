import React, { Component } from 'react'
import { requireNativeComponent, View, Text } from 'react-native';
import { Actions as NavActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import config from '../../config/appconfig'
import { paymentCompleted } from '../../redux/modules/payment';


class CCAvenueWebView extends Component {

  constructor() {
    super();
    this.webViewOnLoad = this.webViewOnLoad.bind(this);
    this.webViewOnLoadingFinish= this.webViewOnLoadingFinish.bind(this);
  }

  webViewOnLoad = (event) => {
    //console.log("WebViewLoad", event.nativeEvent)

  };
  webViewOnLoadingFinish = (event) => {
    let data  = event.nativeEvent.Data;
    let jsonData = JSON.parse(data);
    console.log('Data : ',jsonData);
    const {store: {dispatch}} = this.context;
    dispatch(paymentCompleted(jsonData));
    NavActions.pop();
  };

  render() {
    const { evalData, paymentOptionInfo } = this.props;
    const selectedPaymentOption = paymentOptionInfo.selectedPaymentInfo;
    const cardInfo = paymentOptionInfo.cardDetails;
    let dataAccepted = 'N';
    if(selectedPaymentOption['dataAcceptedAt'] === 'CCAvenue'){
      dataAccepted = 'Y'
    }
    let month=null, expiry_year=null, cvvNumber = null,nameOnCard = null, cardNumber = null;
    if(cardInfo !== null) {
      nameOnCard = cardInfo['nameOnCard'];
        cardNumber = cardInfo['cardNumber'];
        cvvNumber = cardInfo['cvvNumber'];
        month = cardInfo['month'];
        expiry_year = cardInfo['expiryYear'];
    }
    return (

      <CCAvenuePaymentWebView
        style={{
          flex: 1,
          marginTop: 20
        }}
        scalesPageToFit={true}
        onLoadingStart={this.webViewOnLoad}
        onLoadingFinish={this.webViewOnLoadingFinish}
        javaScriptEnabled={true}
        source={{
          merchantId: config.merchantId,
          order_id:  config.OrderId,
          redirect_url: config.redirect_url,
          cancel_url: config.cancel_url,
          language: 'EN',
          billing_name: 'Softlab',
          billing_address: 'near Railway station Delhi',
          billing_city: 'Delhi',
          billing_state: 'Delhi',
          billing_zip: '110024',
          billing_country: 'India',
          billing_tel: '9874563210',
          billing_email: 'dev1.softlab@yahoo.com',
          payment_option:selectedPaymentOption['payOptType'],
          card_type: selectedPaymentOption['cardType'],
          card_name: selectedPaymentOption['cardName'],
          data_accept: dataAccepted,
          accessCode: config.accessCode,
          rsaKeyUrl:  config.rsaKey,
          evalCal: this.props.evalData,
          nameOnCard: nameOnCard,
          cardNumber: cardNumber,
          cvvNumber: cvvNumber,
          month: month,
          expiry_year: expiry_year,
        }}
      />

    )
  }
}


CCAvenueWebView.contextTypes = {
  store: React.PropTypes.object,
};

CCAvenueWebView.propTypes = {
  source: React.PropTypes.any,
  scalesPageToFit: React.PropTypes.bool,
  onLoadingError: React.PropTypes.any,
  onLoadingFinish: React.PropTypes.any,
  onLoadingStart: React.PropTypes.any,
  onMessage: React.PropTypes.any,
  scrollEnabled: React.PropTypes.any,
  selectedPaymentOption: React.PropTypes.any,
  accessibilityLabel: React.PropTypes.any,
  userAgent: React.PropTypes.string,
  domStorageEnabled: React.PropTypes.bool,
  javaScriptEnabled: React.PropTypes.bool,
  automaticallyAdjustContentInsets: React.PropTypes.bool,
  contentInset: React.PropTypes.any,
  html: React.PropTypes.string,
  injectedJavaScript: React.PropTypes.string,
  mediaPlaybackRequiresUserAction: React.PropTypes.bool,
  onContentSizeChange: React.PropTypes.any,
  messagingEnabled: React.PropTypes.bool,
  allowUniversalAccessFromFileURLs: React.PropTypes.any,
  evalData: React.PropTypes.any,
  ...View.propTypes

};
var CCAvenuePaymentWebView = requireNativeComponent('CCAvenueWebView', CCAvenueWebView);

export default connect(state => ({
  paymentOptionInfo: state.payment
}))(CCAvenueWebView)