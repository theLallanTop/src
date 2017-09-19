import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, Form, Label, Item } from 'native-base';
import styles from './ChildModeDialogViewStyles';
import Modal from 'react-native-simple-modal';
import SnackBar from 'react-native-snackbar-dialog';
import { Colors, Fonts } from '../../theme';
import { childModeStatusUpdate, requestToCreateChildModePin, requestForForgotChildModePin } from '../../redux/modules/profile';
export default class ChildModeDialogView extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      pin: '',
      email: '',
      oldChildPin: '',
      newChildPin: '',
      title: '',
      errorMessage: '',
      isShowSetPin: false,
    }
  }

  static contextTypes = {
    store: PropTypes.object,
    drawer: React.PropTypes.object,
  };


  showChildModeDialogView = (title, isCreate) => {
    console.log('Title: ',title);
    this.setState( {
      open: true,
      title: title,
      isShowSetPin: isCreate
    })
  };

  showChildModeSwitchView = ( ) => {

  };


  // _handlingCardNumber(text) {
  //   if (text.indexOf('.') >= 0 || text.length <= 4) {
  //     return;
  //   }
  //   this.setState({
  //     cardNumber: text.replace(/\s?/g, '').replace(/(\d{1})/g, '$1  ').trim()
  //   });
  // }


  closeChildModeDialogView = () => {
    this.setState({
      open: false,
    })
  };

  okButtonPressed = () => {
      const {store: {dispatch}} = this.context;
      new Promise((resolve, reject) => {
        dispatch(childModeStatusUpdate({
          pin: this.state.pin
        }))
          .then((res) => {
            this.setState({
              open: false,
              pin: ''
            });
            resolve();
          })
          .catch((ex)=> {
            this.setState({
              errorMessage: 'You have entered wrong PIN, please check your PIN ',
              pin: ''
            });
            reject();
          });
      });
  };


  okButtonRecoverPressed = () => {
    const {store: {dispatch}} = this.context;
    new Promise((resolve, reject) => {
      dispatch(requestForForgotChildModePin())
        .then((res) => {
          this.setState({
            open: false,

          })
        })
        .catch((ex)=> {
          reject();
        })
    });
  };


  // validatePinDigit = (childPin) => {
  //   const Digit = '';
  //   return Digit.test(childPin);
  // };

  onPressCreatePinChildMode = () => {
      if(this.state.oldChildPin.length > 0) {
        const {store: {dispatch}} = this.context;
          new Promise((resolve, reject) => {
            dispatch(requestToCreateChildModePin({
              oldChildPin: this.state.oldChildPin,
              newChildPin: this.state.newChildPin
            }))
              .then((res) => {
                SnackBar.show(res.message, {
                  style: { marginBottom: 20 },
                  backgroundColor: Colors.snackBarColor,
                  textColor: Colors.white
                });
                this.setState({
                  open: false,
                  oldChildPin: '',
                  newChildPin: '',
                })
              })
              .catch((ex)=> {
                this.setState({
                  errorMessage: ex.message,
                  oldChildPin: '',
                  newChildPin: '',
                })
              })
          });
      }else {
        this.setState({
          errorMessage: 'Please enter PIN number'
        })
      }
  };

  render() {
    const {open, title} = this.state;
    if (this.state.isShowSetPin !== false) {
      return (
        <Modal
          offset={this.state.offset}
          open={open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false, pin: '', errorMessage: ''})}
          style={{alignItems: 'center'}}>
          <View>
            <Text style={[styles.childModeTitleTextStyle,{ textAlign: 'center' }]}>
              {title}
            </Text>
            <View >
              <Form>
                <Item floatingLabel last>
                  <Label style={{ fontSize: 14 }}>Enter old pin</Label>
                  <Input
                    autoCorrect={false}
                    secureTextEntry={true}
                    maxLength={4}
                    autoFocus={true}
                    style={{ fontWeight:'bold' }}
                    keyboardType="numeric"
                    value={this.state.oldChildPin}
                    onChangeText={(oldChildPin) => {
                    this.setState({ oldChildPin, errorMessage: '' });
                  }}/>
                </Item>
                <Item floatingLabel last>
                  <Label style={{ fontSize: 14 }}>Enter new pin</Label>
                  <Input
                    autoCorrect={false}
                    maxLength={4}
                    secureTextEntry={true}
                    style={{ fontWeight:'bold' }}
                    keyboardType="numeric"
                    value={this.state.newChildPin}
                    onChangeText={(newChildPin) => {
                    this.setState({ newChildPin, errorMessage: '' });
                  }}/>
                </Item>
              </Form>
              <Text style={{color: 'red', marginTop: 5}}>{this.state.errorMessage}</Text>
            </View>
            <View style={styles.childModeButtonViewStyle}>
              <TouchableOpacity
                style={styles.childModeButtonStyle}
                onPress={this.onPressCreatePinChildMode}
              >
                <Text style={styles.childModeButtonTextStyle}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          offset={this.state.offset}
          open={open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false, pin: '', errorMessage: ''})}
          style={{alignItems: 'center'}}>
          {(title === 'To Disable Child Mode, Enter your 4-digit PIN') ?
            <View>
              <Text style={styles.childModeTitleTextStyle}>
                {title}
              </Text>

              <View>
                <Form>
                  <Item floatingLabel last>
                    <Label style={{ fontSize: 14 }}>Enter PIN</Label>
                    <Input
                      autoCorrect={false}
                      secureTextEntry={true}
                      keyboardType="numeric"
                      maxLength={4}
                      autoFocus={true}
                      style={{ fontWeight:'bold' }}
                      value={this.state.pin}
                      onChangeText={(pin) => {
                    this.setState({ pin, errorMessage: '' });
                  }}/>
                  </Item>
                </Form>
                <Text style={{color: 'red', marginTop: 5}}>{this.state.errorMessage}</Text>
              </View>
              <View style={styles.childModeButtonViewStyle}>
                <TouchableOpacity
                  style={styles.childModeButtonStyle}
                  onPress={this.okButtonPressed}
                >
                  <Text style={styles.childModeButtonTextStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View>
              <Text style={styles.childModeTitleTextStyle}>
                {title}
              </Text>
              <View style={styles.childModeButtonViewStyle}>
                <TouchableOpacity
                  style={styles.childModeButtonStyle}
                  onPress={this.okButtonRecoverPressed}
                >
                  <Text style={styles.childModeButtonTextStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </Modal>
      )
    }
  }
}