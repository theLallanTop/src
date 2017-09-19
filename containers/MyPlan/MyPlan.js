import React, { Component, PropTypes } from 'react';
import { View, Text, NetInfo } from 'react-native';
import styles from './MyPlanStyles';
import { connect } from 'react-redux';
import { List, ListItem } from 'native-base';
import { SubscribeTabBarCardRow } from '../../components';
import { getSubscriptionStatus } from '../../redux/modules/subscribe';
import moment from 'moment';

class MyPlan extends Component {

  componentWillMount() {
    const { store: { dispatch }} = this.context;
    dispatch(getSubscriptionStatus())
  }

  static contextTypes = {
    store: PropTypes.object
  };

  static propTypes = {
    subscribe: PropTypes.any
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
      SnackBar.show('Looks like you lost your internet connection. Please try again after your link is active.', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    }
  };


  render() {

    const { subscribe } = this.props;
    console.log('subscribe : ',subscribe.subscriptionInfo);
    let planList = [];
    if(subscribe.subscriptionInfo) {
      planList = subscribe.subscriptionInfo.result
    }
    return (
      <View style={styles.myPlanContainer}>

        <List
          style={{ marginTop: 20 }}
          dataArray={planList}
          renderRow={(item) => {
            return(
              <ListItem>
                <SubscribeTabBarCardRow cards={item} isMyPlan={true} />
              </ListItem>
            );
          }}
        />

      </View>
    );
  }
}

export default connect(state => ({
  subscribe: state.subscribe
}))(MyPlan)


/*<View style={styles.viewMainStatusStyle}>
 <View style={styles.textStatusViewStyle}>
 <Text style={styles.textStatusStyle}>Your subscription Plan</Text>
 </View>
 <View style={styles.textStatusRemainStyle}>
 <Text style={styles.ramainTextStyle}>{subscribe.subscriptionInfo === null ? '0' : subscribe.subscriptionInfo.remainingCount}</Text>
 </View>
 </View>
 */