import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, NetInfo } from 'react-native';
import { Images, Colors, Fonts, Metrics } from '../../theme';
import styles from './SignUpStyle';
import { signUp } from '../../redux/modules/auth';
import { Actions as NavActions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import SnackBar from 'react-native-snackbar-dialog';
import { connect } from 'react-redux';
import { Container, Content, Button, InputGroup, Input, Icon, Form, Item, Label, Row, Col } from 'native-base';
import { FacebookLoginView, GmailLoginView } from '../../components';
import myTracker from '../../helpers/myTracker';
import DatePicker from 'react-native-datepicker'
class SignUp extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object
  };

  onPressSkipButton = () => {
    NavActions.drawer();
  };

  onPressLogInButton = () => {
    NavActions.login();
  };

  onPressSignUpButton = () => {

    if(this.state.username) {
      if (!this.validateEmail(this.state.username)) {
        SnackBar.show(this.state.message, {
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          buttonColor: 'blue',
          textColor: Colors.white
        })
      } else {
        if(this.state.password !== this.state.confirmpassword){
          return(
            SnackBar.show('Your password and confirmation password do not match. Please try again.', {
              style: { marginBottom: 20 },
              backgroundColor: Colors.snackBarColor,
              textColor: Colors.white
            })
          );
        } else if(this.state.date === null){
          SnackBar.show('Please enter your birthday.', {
            style: { marginBottom: 20 },
            backgroundColor: Colors.snackBarColor,
            buttonColor: 'blue',
            textColor: Colors.white
          })
        }
        // this.setState({message: 'valid email'});
        if (this.state.username && this.state.password && this.state.confirmpassword && this.state.date) {
          new Promise((resolve, reject) => {
            const {store: {dispatch}} = this.context;
            dispatch(signUp({username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmpassword, dob: this.state.date}))
              .then((res) => {
                SnackBar.show(res.message, {
                  style: { marginBottom: 20 },
                  backgroundColor: Colors.snackBarColor,
                  textColor: Colors.white
                });
                NavActions.login();
                resolve();
              }).catch((ex) => {
              SnackBar.show(ex.data.message, {
                style: { marginBottom: 20 },
                backgroundColor: Colors.snackBarColor,
                textColor: Colors.white
              });
              reject();
            });
          });
        };
      }
    }else{
      SnackBar.show("Please enter all text field.", {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    }
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  constructor() {
    super();
    this.state = {
      username: '',
      password: undefined,
      confirmpassword: undefined,
      showpassword: false,
      date: null,
      message: 'Please enter a valid email ID.',
    };
  }

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
      SnackBar.show('Looks like you lost your internet connection. Please try again after your link is active', {
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
    const today = new Date();
    myTracker.allowIDFA(true);
    myTracker.setAppName('Fir kya hua');
    myTracker.trackScreenView('Walkthrough');
    myTracker.trackEvent('testcategory', 'testaction');

    return (
      <Container>
        <Content>
          <Spinner visible={this.props.auth.isBusy} />
          <View style={styles.skipSignUpViewStyle}>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.skipSignUpButtonStyle}
              onPress={this.onPressSkipButton}>
              <Text style={styles.skipSignUpTextStyle}>SKIP</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleTextStyle}>Sign Up</Text>
            <Text style={styles.subtextStyle}>Please sign up to experience the{'\n'}
              awesomeness of Fir kya hua </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Form>
              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Your email address</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={false}
                  style={{ fontWeight:'bold' }}
                  eyboardType='email-address'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onChangeText={(username) => {
                    this.setState({ username });
                  }}/>
              </Item>

              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Your password</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={this.state.showpassword ? false : true }
                  style={{ fontWeight:'bold' }}
                  onChangeText={(password) => {
                         this.setState({ password });
                }}/>
              </Item>
              {/*Leave Style Inline, its not working from Style. Will Look Later*/}
              <Item floatingLabel last>
                <Label style={{ fontSize: 14 }}>Confirm password</Label>
                <Input
                  autoCorrect={false}
                  secureTextEntry={this.state.showpassword ? false : true }
                  style={{ fontWeight:'bold' }}
                  onChangeText={(confirmpassword) => {
                         this.setState({ confirmpassword });
                }}/>
              </Item>
              <Button
                block
                transparent
                style={{
                  backgroundColor: Colors.transparent,
                  alignSelf: 'flex-end',
                  marginTop:-48
                }}
                onPress={this.togglePassword}
              >
                <Text
                  style={[styles.loginButtonStyle,{ color: Colors.charcoal, fontWeight: '300' }]}>
                  { this.state.showpassword && this.state.confirmpassword ? 'HIDE' : 'SHOW' }
                </Text>
              </Button>
            </Form>
          </View>

          <View style={styles.datePickerStyle}>
            <DatePicker
              style={{ width: Metrics.screenWidth  , borderWidth: 0, marginBottom: 10 }}
              showIcon = { false}
              date={this.state.date}
              mode="date"
              androidMode="spinner"
              placeholder="Date of birth"
              format="DD MMM YYYY"
              minDate="01 Jan 1945"
              maxDate={today}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
								dateInput:
							 	{
							 		borderColor:"blue", borderWidth:0
							 	},
                dateTouchBody: {
									borderColor:"transparent", borderWidth:0
								},
								placeholderText: {
                  fontSize: Fonts.size.regular,
                  fontFamily: Fonts.Walkthrough.medium,
                }
							}}
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
          <View style={styles.signUpButtonViewStyle}>
            <Button
              block
              style={{
                backgroundColor: Colors.BaseColor
              }}
              onPress={this.onPressSignUpButton}
            >
              <Text style={[styles.signUpButtonStyle,{color: Colors.white}]}>SIGN UP</Text>
            </Button>
          </View>
          <View style={styles.orViewStyle}>
            <Text style={styles.orViewTextStyle}>or</Text>
          </View>
          <View style={styles.signUpWithTextViewStyle}>
            <Text style={styles.orViewTextStyle}>Sign Up with</Text>
          </View>
          <View style={styles.facebookViewStyle}>
            <FacebookLoginView />
          </View>
          <View style={styles.googleViewStyle}>
            <GmailLoginView />
          </View>

        </Content>
        <View style={styles.signUpAlreadyLoginButtonStyle}>
          <View style={{  alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.buttomButtonTextStyle}>Already have an account?</Text>
          </View>
          <View style={{ marginLeft: -15, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Button
              block
              transparent
              style={{
                flex: 1,
              }}
              onPress={this.onPressLogInButton}
            >
              <Text style={[styles.buttomButtonTextStyle,{color: Colors.BaseColor}]}> Log In</Text>
            </Button>
          </View>
        </View>
      </Container>
    )
  }
}
export default connect(state => ({
  auth: state.auth
}))(SignUp)
