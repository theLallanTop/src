import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, TouchableOpacity, Image, NetInfo } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import { SubscribeTabBarCardRow, SubscribePlanDialogView } from '../../components';
import styles from './SubscribeTabBarStyle';
import { List, ListItem, Grid, Row, Col, Content, Container } from 'native-base';
import { connect } from 'react-redux';
import config from '../../config/appconfig';
import { getsubscribelist, getSubscriptionStatus, getSubscriptionPlan } from '../../redux/modules/subscribe';
import { postPaymentToServer } from '../../redux/modules/payment';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions as NavActions } from 'react-native-router-flux';
import SnackBar from 'react-native-snackbar-dialog';
import myTracker from '../../helpers/myTracker';


class SubscribeTabBar extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    subscribecardlist: PropTypes.any,
    isLoading: PropTypes.any,
    subscribe: PropTypes.any,
    selectedPackage: PropTypes.any,
    totalProDetail: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount() {
    const { store: { dispatch }} = this.context;
    dispatch(getsubscribelist());
    if(config.AuthToken) {
      dispatch(getSubscriptionStatus())
    }

  }

  componentWillReceiveProps(nextProps) {
    const { store: { dispatch }} = this.context;
    if(nextProps.paymentCompleteInfo !== null) {
      // console.log('Sub Tab bar',nextProps.paymentCompleteInfo);
      new Promise((resolve, reject) => {
        dispatch(postPaymentToServer(nextProps.paymentCompleteInfo.data))
          .then((res) => {
            if(res.error === false) {
              SnackBar.show(res.message, {
                style: { marginBottom: 20 },
                backgroundColor: Colors.snackBarColor,
                textColor: Colors.white
              });
            }
            if (res.status === "Success"){
              let data;
              if(this.props.selectedPackage !== null) {
                data = {
                  id: this.props.selectedPackage.id,
                  months: this.props.selectedPackage.months,
                  days: this.props.selectedPackage.days,
                  currency: 'INR'
                };
                // console.log('data ====>>>>', data );
                if(config.AuthToken) {
                  dispatch(getSubscriptionPlan(data))
                    .then((response) => {
                      // console.log('response -->>', response);
                      if(response.error === false) {
                        SnackBar.show(response.message, {
                          style: { marginBottom: 20 },
                          backgroundColor: Colors.snackBarColor,
                          textColor: Colors.white
                        });
                      }
                    })
                    .catch((ex) => {
                      console.log('error', ex);
                    })
                }
              }
            }
          })
      })
    }
  }


  onPressContinueBtn = () => {
    const { subscribe } = this.props;
    const isSubscribe = this.props.totalProDetail;
    if(isSubscribe !== null && isSubscribe.subStatus !== false){
      SnackBar.show(isSubscribe.message, {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    } else {
      if(subscribe.selectedSubScriptionPackage !== null) {
        NavActions.storylistview()
      } else {
        SnackBar.show('Please select your story package', {
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        });
      }
    }
  };
  // internet connection

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
    console.log('connectionInfo', isConnected);
    if(!this.state.isConnected){
      SnackBar.show('Your internet connection has been lost', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    }
  };

  onPressYourSubscribePlan = () => {

    this.refs.subscribeplanbox.showSubscribplan('To see your plans, you have to login', false)

  };


  render() {
    // console.log('selectedPackage ====>>>>',this.props.selectedPackage);
    myTracker.allowIDFA(true);
    myTracker.setAppName('Fir kya hua');
    myTracker.trackScreenView('Subscribe');
    myTracker.trackEvent('testcategory', 'testaction');
    const { subscribe } = this.props;
    let subscribecardlist = subscribe.subscribeResponded;
    let subscriptionInfo = subscribe.subscriptionInfo;
    let subscribelist = [];
    if(subscribecardlist !== null) {
      subscribelist = subscribecardlist;
    }
    // console.log('subscribecardlist', subscribecardlist);
    let index = 0;
    let cards = [];
    let subscribeRowlist = [];

    if(subscribecardlist){
      for (index; index < subscribecardlist.length; index+=2) {
        subscribeRowlist.push(subscribecardlist[index]);
        if((index +1) < subscribelist.length){
          subscribeRowlist.push(subscribecardlist[index + 1]);
        }
        cards.push({ cardItems: subscribeRowlist });
        subscribeRowlist = [];
      }
    }


    return(
      <Container style={{ flex: 1 }}>
        <Content>
        <Spinner visible={this.props.isLoading} />
        <Spinner visible={this.props.paymentCompleteInfo === null ? false : true} textContent="Please wait..." />
        {(config.AuthToken) &&
          <TouchableOpacity style={styles.viewMainStatusStyle} onPress={this.onPressYourSubscribePlan}>
            <View style={styles.textStatusViewStyle}>
              <Text style={styles.textStatusStyle}>Your subscription Plan</Text>
            </View>
          </TouchableOpacity>
        }
        <View style={styles.choosePlanViewStyle}>
          <Text style={styles.choosePlanTextStyle}>Choose your plan</Text>
        </View>
        <List
          style={{ marginTop: -20 }}
          dataArray={cards}
          renderRow={(item, sectionID, rowID) => {
           return(
             <Grid>
               <Row style={{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                 <Col style={{ marginRight: -12, marginBottom: -12, marginTop: -12 }}>
                   <ListItem>
                     <SubscribeTabBarCardRow cards={item.cardItems[0]} subscribecards={this.props.categaries} rowID={rowID} />
                   </ListItem>
                 </Col>
                 { item.cardItems.length > 1 &&
                 <Col style={{ marginLeft: -12, marginBottom: -12, marginTop: -12 }}>
                    <ListItem>
                      <SubscribeTabBarCardRow cards={item.cardItems[1]} subscribecards={this.props.categaries} rowID={rowID} />
                    </ListItem>
                 </Col>
                 }
                </Row>
              </Grid>
            );
           }}
          />

        </Content>

        {(config.AuthToken && !this.props.myProfile.isSwitchOn) && <View style={styles.continueViewStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.continueBtnStyle}
              onPress={this.onPressContinueBtn}>
              <View style={styles.continueBtnViewStyle}>
                <Text style={styles.continueTextStyle}>CONTINUE</Text>
                <Image source={Images.countinuenexticon} style={styles.continueIconStyle}/>
              </View>
            </TouchableOpacity>
          </View>}
        <SubscribePlanDialogView ref="subscribeplanbox"/>
        </Container>

    );
  }
}
export default connect((state) => ({
  isLoading: state.subscribe.isLoading,
  subscribe: state.subscribe,
  myProfile: state.profile,
  totalProDetail: state.profile.totalProDetail,
  paymentCompleteInfo: state.payment.paymentComplete,
  selectedPackage: state.subscribe.selectedSubScriptionPackage,
}))(SubscribeTabBar)