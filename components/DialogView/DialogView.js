import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-simple-modal';
import styles from './DialogViewStyles';
import { Icon } from 'native-base';
import { Actions as NavActions } from 'react-native-router-flux';

export default class DialogView extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      alertText: '',
      isWishList: false
    }
  }

  closeButtonClicked = () => {
    this.setState({open: false})
  };

  okButtonPressed = () => {
    this.setState({open: false})
  };

  subscribeButtonClicked = () => {
    this.setState({open: false});
    NavActions.pop()
  };

  showDialog = (message, isWishList) => {
    this.setState({
      open: true,
      alertText: message,
      isWishList: isWishList
    })
  };

  render() {
    const { open, isWishList, alertText } = this.state;
    return (
      <Modal
        open={open}
        overlayBackground={'rgba(0, 0, 0, 0.3)'}
        modalDidOpen={() => console.log('open')}
        modalDidClose={() => this.setState({open: false }) }
        containerStyle={styles.modalDialogContainerStyle}
        modalStyle={styles.dialogModelStyle}
      >
        <View style={styles.mainDialogViewStyle}>
          {isWishList &&<View style={styles.closeButtonViewStyle}>
            <TouchableOpacity
              style={styles.closeButtonStyle}
              onPress={this.closeButtonClicked}
            >
              <Icon name="md-close" style={{color: 'grey', fontSize: 20}} />
            </TouchableOpacity>
          </View> }
          <Text style={styles.titleTextStyle}>{alertText}</Text>
          {isWishList && <View style={styles.subscribeViewStyle}>
            <TouchableOpacity
              style={styles.subscribeButtonStyle}
              onPress={this.subscribeButtonClicked}
            >
             <Text style={styles.subscribeTextStyle}>Subscribe</Text>
            </TouchableOpacity>
          </View>}
          {!isWishList && <View style={styles.subscribeViewStyle}>
            <TouchableOpacity
              style={styles.subscribeButtonStyle}
              onPress={this.okButtonPressed}
            >
              <Text style={styles.subscribeTextStyle}>OK</Text>
            </TouchableOpacity>
          </View>}
        </View>
      </Modal>
    );
  }
}