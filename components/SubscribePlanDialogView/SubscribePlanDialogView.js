import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-simple-modal';
import styles from './SubscribePlanDialogViewStyle';

import { getSubscriptionPopUp } from '../../redux/modules/subscribe';
import moment from 'moment';

export default class SubscribePlanDialogView extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

 async componentDidMount() {
    const { store: { dispatch }} = this.context;
    dispatch(getSubscriptionPopUp())
      .then((response) => {
        // console.log('Response ******************** ', response);
        this.setState({ ExpDetails: response[0] })
      })
      .catch((error) =>{
        // console.log('Error ******************** ', error);
      })
  }

  constructor() {
    super();
    this.state = {
      open: false,
      alertText: '',
      ExpDetails: undefined,
    }
  }

  closeButtonClicked = () => {
    this.setState({open: false})
  };

  showSubscribplan = (message) => {
    this.setState({
      open: true,
      alertText: message,
    })
  };

  render() {
    const { open, ExpDetails   } = this.state;
    console.log('data ====>> ', ExpDetails);

    return (
      <Modal
        open={open}
        overlayBackground={'rgba(0, 0, 0, 0.3)'}
        modalDidOpen={() => console.log('open')}
        modalDidClose={() => this.setState({open: false }) }
        containerStyle={styles.modalSubContainerStyle}
        modalStyle={styles.SubModelStyle}
      >
        <View style={styles.mainSubViewStyle}>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.titleSubStyle}>Your subscription Plan</Text>
          </View>
          {(ExpDetails != undefined) ?
          <View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.subPlanSubStyle]}>{(ExpDetails !== undefined) && ExpDetails.title}</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' , marginTop: 10 , flexDirection: 'row'}}>
                <Text style={[styles.subTitleSubStyle,{ paddingRight: 10 }]}>Expiry date of Plan</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' , marginTop: 5 , flexDirection: 'row'}}>
                <Text style={[styles.subPlanSubStyle]}>{(ExpDetails !== undefined) && moment(ExpDetails.packageEnd, 'YYYY-MM-DD').format("DD MMM YYYY")}</Text>
              </View>
          </View>
          :<View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.subPlanSubStyle]}>{"Your subscription plan haven't activated."}</Text>
              </View>
          </View>}

          <View style={{ alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity style={styles.closeButtonStyle} onPress={this.closeButtonClicked}>
              <Text style={styles.buttonTextStyle}>Ok</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    );
  }
}

