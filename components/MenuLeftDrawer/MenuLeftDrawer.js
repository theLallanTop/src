import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, Icon, Grid, Col, Row } from 'native-base';
import { View, Text, Image, Platform, TouchableOpacity, Switch, Share, AsyncStorage } from 'react-native'
import { Colors, Images, Fonts, Metrics } from '../../theme';
import styles from './MenuLeftDrawerStyle';
import config from '../../config/appconfig';
import { Actions as NavActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logout } from '../../redux/modules/auth'
import Spinner from 'react-native-loading-spinner-overlay';
import SnackBar from 'react-native-snackbar-dialog';
import { switchStatus, requestPinForChildMode, childModeStatusUpdate, getprofiledetails, requestForForgotChildModePin } from '../../redux/modules/profile';
import { DialogView, ChildModeDialogView, SettingView , SubChildView} from '../../components';

class MenuLeftDrawer extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.any,
    isBusy: PropTypes.any,
    switchValue: PropTypes.any,
    changePinStatus: PropTypes.any
  };

  static contextTypes = {
    store: PropTypes.object,
    drawer: React.PropTypes.object,
  };

  componentDidMount() {
    console.log('config.AuthToken ++++>> ', config.AuthToken);
    if(config.AuthToken) {
      const {store: {dispatch}} = this.context;
      dispatch(getprofiledetails());
      if(this.props.profile) {
        this.setState({isChildMode: true})
      }
    }
  }


  onPressResetBtn = () => {
      this.refs.childMode.showChildModeDialogView('RESET PIN',true)
  };

  onPressRecoverBtn = () => {
    this.setState({ isPress: true});
    const {store: {dispatch}} = this.context;
    dispatch(requestForForgotChildModePin())
      .then((response) => {
      if(response.statusCode === 200){
        this.setState({ isPress: false});
        SnackBar.show(response.message, {
          style: { marginBottom: 20 },
          backgroundColor: Colors.snackBarColor,
          textColor: Colors.white
        });
      }
        // console.log('******************************>>>>>>', response);
      })
      .catch((error) => {
        // console.log('******************************>>>>>>', response);
      })
  };


  switchStatusChange = () => {
    if(this.props.profile) {
      console.log('Pofile : ',this.props.profile);
      const { switchValue } = this.props;

      if(this.props.profile.isChildModeCreated !== false){
        let childModeStatus = 'To Disable Child Mode, Enter your 4-digit PIN';
        if(switchValue === true) {
          this.refs.childMode.showChildModeDialogView(childModeStatus , false)
          }else {
          const {store: {dispatch}} = this.context;
          dispatch(switchStatus(true));
        }
        // this.refs.childMode.showChildModeDialogView(childModeStatus , false)
      } else {

        this.refs.childMode.showChildModeDialogView(`CREATE CHILD MODE PIN`, true);

        // const {store: {dispatch}} = this.context;
        // new Promise((resolve, reject) => {
        //   dispatch(requestPinForChildMode())
        //     .then((res) => {
        //       console.log('res:----->> ',res);
        //       this.refs.childMode.showChildModelSetPinDialogView(`This is child mode Secret Pin ${res.childPIn}. Please enter it for enable the Child Mode`);
        //       resolve();
        //     })
        //     .catch((ex)=> {
        //       console.log('Ex: ',ex);
        //       reject()
        //     })
        // })
      }

      // const {store: {dispatch}} = this.context;
      // dispatch(switchStatus(!switchValue));
    }
  };

  myPlanOptionSelected = () => {
    if(config.AuthToken) {
      const drawer = this.context.drawer;
      drawer.close();
      NavActions.myPlan();
    } else {
      this.refs.dialogView.showDialog('To see your plans, you have to login', false)
    }
  };

  constructor() {
    super();
    this.state = {
      isChildMode: false,
      isSetting: false,
      isPress: false,
    };
  }

  // onPresschildModeBtn= () => {
  //   this.refs.childMode.showChildModeDialogView(true)
  // };

  omPressLoginBtn = () => {
    NavActions.login({ type: 'reset'});
  };


  onPressmyProfileBtn = () => {
    const drawer = this.context.drawer;
    drawer.close();
    NavActions.profileeditview();
  };


  onPressLogout = async () => {
    // const drawer = this.context.drawer;
    // drawer.close();
    // console.log('logout');
    await AsyncStorage.removeItem('userData');
    const {store: {dispatch}} = this.context;
    dispatch(logout());
  };


  _shareText() {
    Share.share({
      message: 'A framework for building native apps using React',
      url: 'http://facebook.github.io/react-native/',
      title: 'React Native'
    }, {
      dialogTitle: 'Share React Native website',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
      .then(this._showResult)
      .catch((error) => this.setState({result: 'error: ' + error.message}));
  };

  onPressSettingBtn = () => {
    if(config.AuthToken){
      this.setState({ isSetting: !this.state.isSetting});
    }
  };


  render() {
    // console.log('config.AuthToken', config.AuthToken);

    const { profile, switchValue, changePinStatus } = this.props;

    // console.log('################################ ======= profile pin', changePinStatus);

    let user_profile = null;
    let user_details = null;
    let socialImageUrl = null;
    if(profile) {
      user_profile = profile.profile;
      user_details = this.props.profile;
      socialImageUrl = user_profile.socialImageUrl;
    }

    return(

      <Container>
        <Content>
          <Spinner visible={this.props.isLoading} />
          <Spinner visible={this.state.isPress} />
          <View style={(Metrics.screenHeight === Metrics.isIphone_5 ) ? styles.iPhoneTopView : styles.topView }>
            <Grid>
              {(profile) ?
                <Row>
                  <TouchableOpacity style={{ flex: 1, flexDirection : 'row' }} onPress={this.onPressmyProfileBtn}>
                    <Col style={{ flex: 0.3, justifyContent: 'center'}}>
                      {(user_profile.profilePictureKey) ?
                        <Image source={{uri:`${config.apiUrl}/profile/image?key=${user_profile.profilePictureKey}`}} style={styles.logoIcon} />
                        :
                        <Image source={(socialImageUrl !== null) ? {uri:socialImageUrl} : Images.leftNavigationPro} style={styles.logoIcon} />
                      }
                    </Col>
                    <Col style={styles.textColStyle}>
                      {(user_profile) &&
                      <Text style={styles.titleText}>
                        {(user_profile.firstName !== null) ? user_profile.firstName : 'Press to profile edit'}
                      </Text>
                      }
                    </Col>
                  </TouchableOpacity>
                </Row>
                :
                <Row>
                  <Col style={{ flex: 0.5, justifyContent: 'center'}}>
                    <Image source={Images.leftNavigationPro} style={styles.logoIcon}/>
                  </Col>
                  <Col style={styles.textColStyle}>
                    <Text style={styles.titleText}>
                      Guest User
                    </Text>
                  </Col>
                  <Col style={{ width: 120, justifyContent: 'center'}}>
                    {(Metrics.screenHeight === Metrics.isIphone_5 ) ?
                      <Button
                        style={{ height: 20, marginRight: 5, backgroundColor: Colors.white }}
                        onPress={this.omPressLoginBtn} transparent block>
                        <Text style={styles.IphoneloginTextStyle}>LOGIN</Text>
                      </Button>
                      :
                      <Button
                        style={{ height: (Platform.OS === 'ios') ? 30 : 35, marginRight: 10, backgroundColor: Colors.white }}
                        onPress={this.omPressLoginBtn} transparent block>
                        <Text style={styles.loginTextStyle}>LOGIN</Text>
                      </Button>
                    }
                  </Col>
                </Row>
              }
            </Grid>
          </View>

          <View style={styles.container}>
            <Grid>
              <Col>
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                >
                  <Row>
                    <Col style={{ flex: 0.38, justifyContent: 'center' }}>
                      <Image resizeMode="contain" style={styles.iconStyle} source={Images.childmodeicon} />
                    </Col>
                    <Col style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>Child Mode</Text>
                    </Col>
                    <Col style={[styles.switchButtonViewStyle, {justifyContent: 'center'}]}>
                      <View style={{flex:1}}>
                        <Switch onValueChange={this.switchStatusChange}
                                value={this.props.switchValue} />
                      </View>
                    </Col>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                  onPress={this.myPlanOptionSelected}>
                  <Row>
                    <Col style={{ flex: 0.2, justifyContent: 'center' }}>
                      <Image resizeMode="contain" style={styles.iconStyle} source={Images.myplanicon} />
                    </Col>
                    <Col style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>Your Subscription Plan</Text>
                    </Col>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                  onPress={this._shareText}>
                  <Row>
                    <Col style={{ flex: 0.2, justifyContent: 'center' }}>
                      <Image resizeMode="contain" style={styles.iconStyle} source={Images.shareicon} />
                    </Col>
                    <Col style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>Share</Text>
                    </Col>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                  onPress={this.onPressSettingBtn}
                >
                  <Row>
                    <Col style={{ flex: 0.2, justifyContent: 'center' }}>
                      <Image resizeMode="contain" style={styles.iconStyle} source={Images.settingicon} />
                    </Col>
                    <Col style={{ flex: 1, marginLeft: 3.5,  alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>Settings</Text>
                    </Col>

                    <Col style={{ flex: 0.2, alignItems: 'flex-end', justifyContent: 'center' }}>
                      {this.state.isSetting ?
                        <Icon name="ios-arrow-down-outline" style={{ fontSize: 20, color: 'gray' }}/>
                        :
                        <Icon name="ios-arrow-forward-outline" style={{ fontSize: 20, color: 'gray' }}/>
                      }
                    </Col>
                  </Row>
                </TouchableOpacity>
                {this.state.isSetting &&
                  <View style={{ marginLeft: Metrics.screenWidth/5, marginTop: 2, marginBottom: 2 }}>
                    <TouchableOpacity
                      underlayColor = {Colors.cloud}
                      style={{ marginBottom: 10 }}
                      onPress={this.onPressRecoverBtn}>
                      <Text style={styles.buttonTextStyle}>Recover the Child Mode</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      underlayColor = {Colors.cloud}
                      style={{ marginTop: 10 }}
                      onPress={this.onPressResetBtn}>
                      <Text style={styles.buttonTextStyle}>Reset the Child Mode </Text>
                    </TouchableOpacity>
                  </View>
                }
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                  onPress={() => NavActions.aboutus()}
                >
                  <Row>
                    <Col style={{ flex: 0.2, justifyContent: 'center' }}>
                      <Image resizeMode="contain" style={styles.iconStyle} source={Images.abouticon} />
                    </Col>
                    <Col style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>About Us</Text>
                    </Col>
                  </Row>
                </TouchableOpacity>
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                >
                  <Row>
                    <Col style={{ flex: 0.2, justifyContent: 'center' }}>
                      <Image resizeMode="contain" style={styles.iconStyle} source={Images.helpicon} />
                    </Col>
                    <Col style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>Help</Text>
                    </Col>
                  </Row>
                </TouchableOpacity>
                {(config.AuthToken) &&
                <TouchableOpacity
                  underlayColor={Colors.cloud}
                  style={styles.buttonLeftStyle}
                  onPress={this.onPressLogout}
                >
                  <Row>
                    <Col style={{ flex: 0.2, justifyContent: 'center' }}>
                      <Icon name="md-log-out" style={{ color: Colors.BaseColor}}/>
                    </Col>
                    <Col style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                      <Text style={styles.buttonTextStyle}>Logout</Text>
                    </Col>
                  </Row>
                </TouchableOpacity>
                }
              </Col>
            </Grid>
          </View>

        </Content>
        <ChildModeDialogView ref="childMode"/>
        <DialogView ref="dialogView"/>
        <SettingView ref="settingView" />
      </Container>
    );
  }
}

export default connect((state) => ({
  changePinStatus: state.profile.changePinStatus,
  profile : state.profile.profile,
  switchValue: state.profile.isSwitchOn,
  isBusy: state.profile.isLoading,
}))(MenuLeftDrawer)