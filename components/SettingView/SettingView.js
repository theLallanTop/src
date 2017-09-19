import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors, Images } from '../../theme';
import Modal from 'react-native-simple-modal';
import styles from './SettingViewStyle';
import { Form, Input, Icon, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import { requestForForgotChildModePin } from '../../redux/modules/profile';
import SnackBar from 'react-native-snackbar-dialog';

export default class SettingView extends Component{

  static contextTypes = {
    store: PropTypes.object
  };

  static propTypes = {
    dispatch: PropTypes.func,
  };

  recovPinModelPopUp = (isOpen) => {
    this.setState({
      open: isOpen,
      ischildmodePin: false,
    });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  constructor(){
    super();
    this.state = {
      open: false,
      mail: '',
      childmodePin: '',
      errorMessage: ''
    }
  }

  onPressSubmitBtn = () => {
    if(this.state.mail) {
      if (!this.validateEmail(this.state.mail)) {
        SnackBar.show(this.state.message, {
          duration: 1000,
          style: {marginBottom: 20},
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        })
      } else {
        new Promise((resolve, reject) => {
          const {store: {dispatch}} = this.context;
          dispatch(requestForForgotChildModePin(this.state.mail))
            .then((res) => {
            console.log('child pin -->>', res);
              if(res.statusCode === 200 ) {
                this.setState({
                  mail: '',
                  childmodePin: res.childPIn,
                  ischildmodePin: true,
                });
              }else {
                this.setState({
                  errorMessage: 'Please use registered email',
                  mail: '',
                });
              }
              resolve();
            }).catch((ex) => {
            reject();
          });
        });
      };
    }
  };

  onPressCancelBtn = () => {
    this.setState({
      mail: '',
      open: false,
    })
  };

  render() {
    return(
      <Modal
        open={this.state.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({ open: false })}
        containerStyle={{  }}>
        <View style={{ marginTop: 15, justifyContent: 'center' }}>
          <Text style={styles.titleTextStyle}>
            Recover your child mode pin
          </Text>
        </View>
        {(this.state.ischildmodePin !== true) ?
        <View>
          <Form>
            <Item floatingLabel last>
              <Label style={{ fontSize: 14 }}>ENTER AUTHORIZED E-MAIL</Label>
              <Input
                autoCorrect={ false }
                keyboardType="email-address"
                style={{ fontWeight:'bold' }}
                value={this.state.mail}
                onChangeText={(mail) => {
                   this.setState({ mail, errorMessage: '' });
                 }}
              />
            </Item>
          </Form>
          <Text style={{color: 'red', marginTop: 5}}>{this.state.errorMessage}</Text>
        </View>
          :
          <View>
            <Form>
              <Label style={{ fontSize: 14, textAlign: 'center', padding: 20 }}>{this.state.childmodePin}</Label>
            </Form>
          </View>
        }
        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          {(this.state.ischildmodePin !== true) &&
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.closeBtnStyle}
              onPress={this.onPressSubmitBtn}>
              <Text style={styles.closeTextStyle}>SUBMIT</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            underlayColor = {Colors.cloud}
            style={styles.closeBtnStyle}
            onPress={this.onPressCancelBtn}>
            <Text style={styles.closeTextStyle}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
