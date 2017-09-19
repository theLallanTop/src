import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, NetInfo, AsyncStorage } from 'react-native';
import { Images, Colors } from '../../theme';
import styles from './LoginStyle';
import { Actions as NavActions } from 'react-native-router-flux';
import { login, setInternetConnection, forgotpassword, changepassword } from '../../redux/modules/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-dialog';
import { FacebookLoginView, GmailLoginView } from '../../components';
import Modal from 'react-native-simple-modal';
import { Container, Content, Button, InputGroup, Input, Icon, Form, Item, Label } from 'native-base';

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      open: false,
      username: '',
      password: undefined,
      forgotPassword: undefined,
      showpassword: false,
      isForgot: false,
      isConnected:false,
      message: 'Please enter your valid email',
      isEmailSent: false,
      forgotPasswordToken: null,
      newPassword: null,
      confirmNewPassword: null,
    };
    this.handleIsConnected = this.handleIsConnected.bind(this);
  }

  // internet connection ...

  handleIsConnected(isConnected) {
    this.setState({ isConnected: isConnected });
    const { store: { dispatch } } = this.context;
    dispatch(setInternetConnection(false));
  }
  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleIsConnected(isConnected);
    });

    NetInfo.isConnected.addEventListener(
      'change',
      this.handleIsConnected
    );
  }

  //email validation ...

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  onPressSkipButton = () => {
    NavActions.drawer();
  };

  onPressSignUpButton = () => {
    NavActions.signUp();
  };

  onPressForgotButton = () => {
    this.setState({open: true})
  };

  onPressForgotSubmitButton = () => {

    if(this.state.forgotPassword) {
      if (!this.validateEmail(this.state.forgotPassword)) {
        SnackBar.show(this.state.message, {
          duration: 1000,
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        })
      } else {
        if (this.state.forgotPassword) {
          this.setState({ isForgot: true });

          new Promise((resolve, reject) => {
            const {store: {dispatch}} = this.context;
            dispatch(forgotpassword({email: this.state.forgotPassword}))
              .then((res) => {
                this.setState({open: true, isForgot: false, isEmailSent: true});
                SnackBar.show(res.message, {
                  style: { marginBottom: 20 },
                  backgroundColor: Colors.snackBarColor,
                  textColor: Colors.white
                });
                resolve();
              }).catch((ex) => {
              this.setState({open: false, isForgot: false});
              console.log('error', ex);
              SnackBar.show(ex.data.message, {
                style: { marginBottom: 20 },
                backgroundColor: Colors.snackBarColor,
                textColor: Colors.white

              });
              reject();
            });
          });
        }
      }
    }else{
      SnackBar.show('Please enter email address.', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      })
    }

  };

  changePasswordClicked = () => {

    const { isEmailSent, forgotPasswordToken, newPassword, confirmNewPassword, forgotPassword } = this.state;
    console.log('isEmail sent: ',isEmailSent,forgotPasswordToken, newPassword, confirmNewPassword, forgotPassword)
    if(forgotPasswordToken && newPassword && confirmNewPassword) {
      if(newPassword !== confirmNewPassword){
        SnackBar.show('Password and Confirm Password do not match', {
          duration: 1000,
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        })
      } else {
        new Promise((resolve, reject) => {
          const {store: {dispatch}} = this.context;
          dispatch(changepassword({
            email:  forgotPassword,
            token: forgotPasswordToken,
            password: newPassword,
            confirmPassword: confirmNewPassword
          }))
            .then((res) => {
              this.setState({ open: false, isEmailSent: false})
            })
            .catch((error) => {
              this.setState({ open: false,})
            })
        })
      }
    }
  };

  onPressLoginButton = () => {

    if(this.state.username) {
      if (!this.validateEmail(this.state.username)) {
        SnackBar.show(this.state.message, {
          duration: 1000,
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        })
      } else {
        if (this.state.username && this.state.password) {
          new Promise((resolve, reject) => {
            const {store: {dispatch}} = this.context;
            dispatch(login({username: this.state.username, password: this.state.password}))
              .then((res) => {
                resolve();
              }).catch((ex) => {
              console.log('error', ex);
              SnackBar.show(ex.data.message, {
                style: { marginBottom: 20 },
                backgroundColor: Colors.snackBarColor,
                textColor: Colors.white
              });
              reject();
            });
          });
        }
      }
    }else {
        SnackBar.show("Please enter email address and password.", {
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        });
    }
  };

  togglePassword = () => {
    this.setState({showpassword: !this.state.showpassword});
  };
  render() {
    return (
      <Container>
        <Content>
          <Spinner visible={this.props.auth.isBusy} />
          <View style={styles.skipLogInViewStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.skipLogInButtonStyle}
              onPress={this.onPressSkipButton}>
              <Text style={styles.skipLogInTextStyle}>SKIP</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleTextStyle}>Log In</Text>
            <Text style={styles.subtextStyle}>Please Login to experience the{'\n'}
              awesomeness of Fir kya hua </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Form>
              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Your email address</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={false}
                  autoCapitalize="none"
                  style={{ fontWeight:'bold' }}
                  onChangeText={(username) => {
                    this.setState({ username });
                  }}/>
              </Item>
              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Your password</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  secureTextEntry={ this.state.showpassword ? false : true }
                  style={{ fontWeight:'bold' }}
                  onChangeText={(password) => {
                    this.setState({ password });
                  }}/>
              </Item>

            </Form>
          </View>
          <View style={styles.loginButtonViewStyle}>
            <Button
              block
              style={{backgroundColor: Colors.BaseColor}}
              onPress={this.onPressLoginButton}>
              <Text style={[styles.loginButtonStyle, {color: Colors.white}]}>LOG IN</Text>
            </Button>
          </View>
          <View style={styles.forgotPasswordViewStyle}>
            <View style={styles.forgotLeftMarginViewStyle}>
              <Button
                block
                transparent
                style={{ backgroundColor: Colors.transparent }}
                onPress={this.onPressForgotButton}>
                <Text style={[styles.loginButtonStyle,{ color: Colors.BaseColor }]}>FORGOT PASSWORD</Text>
              </Button>
            </View>
          </View>
          <View style={styles.orViewStyle}>
            <Text style={styles.orViewTextStyle}>or</Text>
          </View>
          <View style={styles.loginWithTextViewStyle}>
            <Text style={styles.orViewTextStyle}>Log In with</Text>
          </View>
          <View style={styles.facebookButtoViewStyle}>
            <FacebookLoginView />
          </View>
          <View style={styles.googleButtonViewStyle}>
            <GmailLoginView />
          </View>

        </Content>
        <View style={styles.logInAlreadyLoginButtonStyle}>
          <View style={{  alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.buttomButtonTextStyle}>New User?</Text>
          </View>
          <View style={{ marginLeft: -15, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Button block transparent style={{ flex: 1 }} onPress={this.onPressSignUpButton}>
              <Text style={[styles.buttomButtonTextStyle,{color: Colors.BaseColor}]}>Sign Up</Text>
            </Button>
          </View>
        </View>
        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false, })}
          style={{alignItems: 'center'}}>
          {!this.state.isEmailSent && <View>
            <Text style={styles.forgotPasswordTitleTextStyle}>Forgot Password</Text>
            <Spinner visible={this.state.isForgot}/>
            <Form>
              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Your email address</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={false}
                  autoCapitalize="none"
                  style={{ fontWeight:'bold' }}
                  onChangeText={(forgotPassword) => {
                    this.setState({ forgotPassword });
                  }}/>
              </Item>
            </Form>
            <Button
              block
              transparent
              style={{
                marginTop: 20,
                marginBottom: 10,
                backgroundColor: Colors.BaseColor,
                borderRadius: 5
              }}
              onPress={this.onPressForgotSubmitButton}>
              <Text style={[styles.buttomButtonTextStyle,{color: Colors.white}]}>Submit</Text>
            </Button>
          </View>}
          {this.state.isEmailSent && <View>
            <Text style={styles.forgotPasswordTitleTextStyle}>Forgot Password</Text>
            <Spinner visible={this.state.isForgot}/>
            <Form>
              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Enter token that is sent to your email</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={false}
                  autoCapitalize="none"
                  style={{ fontWeight:'bold' }}
                  onChangeText={(forgotPasswordToken) => {
                    this.setState({ forgotPasswordToken });
                  }}/>
              </Item>

              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Enter new Password</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={true}
                  style={{ fontWeight:'bold' }}
                  autoCapitalize="none"
                  onChangeText={(newPassword) => {
                    this.setState({ newPassword });
                  }}/>
              </Item>

              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Enter confirm password</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={true}
                  style={{ fontWeight:'bold' }}
                  autoCapitalize="none"
                  onChangeText={(confirmNewPassword) => {
                    this.setState({ confirmNewPassword });
                  }}/>
              </Item>

            </Form>
            <Button
              block
              transparent
              style={{
                marginTop: 20,
                marginBottom: 10,
                backgroundColor: Colors.BaseColor,
                borderRadius: 5
              }}
              onPress={this.changePasswordClicked}>
              <Text style={[styles.buttomButtonTextStyle,{color: Colors.white}]}>Change Password</Text>
            </Button>
          </View>}
        </Modal>
      </Container>
    )
  }
}

export default connect(state => ({
  auth: state.auth
}))(Login)