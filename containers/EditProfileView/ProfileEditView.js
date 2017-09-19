import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, NetInfo, ActivityIndicator } from 'react-native';
import styles from './ProfileEditViewStyle';
import { Images, Colors, Fonts, Metrics } from '../../theme';
import { connect } from 'react-redux';
import { Container, Content, Input, Form, Item, Label, Row, Right } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker';
import config from '../../config/appconfig';
import DatePicker from 'react-native-datepicker'
import RadioForm from 'react-native-simple-radio-button';
import { getprofiledetails, updateProfile } from '../../redux/modules/profile';
import Spinner from 'react-native-loading-spinner-overlay';
import SnackBar from 'react-native-snackbar-dialog';
import moment from 'moment';
import { Actions as NavActions } from 'react-native-router-flux';
const { width } = Dimensions.get('window');

const options = {
  title: 'Edit Profile',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const radio_props = [
  {label: 'Male', value: 'Male' },
  {label: 'Female', value: 'Female' }
];

class ProfileEditView extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    editProfile: PropTypes.any,
    profile: PropTypes.any,
  };

  componentWillMount() {

    const { profile } = this.props;
    const user_profile = profile.profile;
    console.log('userProfile :',user_profile);
		let valueGender = 0;
		if(user_profile.gender === 'female') {
			valueGender = 1
		}
    this.setState({
    	firstName : user_profile.firstName,
   		lastName : user_profile.lastName,
      value : valueGender,
      date : user_profile.dob,
    	file : user_profile.file,
    	profileKey : user_profile.profilePictureKey,
   	});
	}

  static contextTypes = {
    store: PropTypes.object
  };
  constructor() {
    super();
    this.state = {
      firstName: null,
      lastName: null,
			dob: null,
			file: null,
			description: null,
			profileKey: null,
      value: 'Female',
     	date:null,
      message: 'Please enter your valid email ',
			isVisible: false,
      isDone: false
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
      SnackBar.show('Your internet connection has been lost', {
        style: { marginBottom: 20 },
        backgroundColor: Colors.snackBarColor,
        textColor: Colors.white
      });
    }
  };

  // _handleConnectionInfoChange = (connectionInfo) => {
  //   this.setState({connectionInfo});
  //   if(this.state.connectionInfo){
  //     SnackBar.show('Your internet connection has been lost', {
  //       style: { marginBottom: 20 },
  //       backgroundColor: Colors.snackBarColor,
  //       textColor: Colors.white
  //     });
  //   }
  // };

  onPressEditProfileButton = () => {
	 this.setState({
		isVisible: true
	 });
	 let gender;
	 if(this.state.value === 0){
 			gender = 'male'
 	 }
 	 if(this.state.value === 1) {
      gender = 'female'
 	 }
 		else
 		{
 			gender = this.state.value
 		}

    let data = [
        {name: 'file', filename: 'avatar.png', data: this.state.file},
        {name : 'firstName', data : this.state.firstName},
        {name : 'lastName', data : this.state.lastName},
        {name : 'dob', data : this.state.date},
				{name : 'gender', data : gender},
      ];
		console.log('data ===>>',data);

    RNFetchBlob.fetch('PUT', `${config.apiUrl}/profile`,
      { Authorization: `Bearer ${config.AuthToken}`, 'Content-Type': 'multipart/form-data' },
      data).then((resp) => {
      console.log('resp', resp);
			SnackBar.show('Profile updated successfully', {
				style: { marginBottom: 20 },
				backgroundColor: Colors.snackBarColor,
				textColor: Colors.white
			});
			const {store: {dispatch}} = this.context;
			dispatch( getprofiledetails());
			this.setState({
				isVisible: false
			});

      NavActions.pop();

    }).catch((err) => {
      console.log('err', err);
    })
	};

  onPressUploadProfileImageButton = () => {
    console.log('Camera open');
    this.setState({ isDone: true });
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        this.setState({ isDone: false });
      	console.log('camera picture did cancel');
      }
      else if (response.error) {
        this.setState({ isDone: false });
        console.log('camera picture did error');
      }
      else {
        console.log('camera picture else condition');
        this.setState({ isDone: false });
        let source = { uri: response.uri };
        console.log('source ===>>', source);
        let sourceData = { uri: `data:image/jpeg;base64,${response.data}`, isStatic: true, data: response.data };
				this.setState({ file:sourceData.data });
        console.log('source ===>>', sourceData);
        this.setState({
          avatarSource: source
        });
      }
    });
	};

	render() {

    let ImageUrl;
    const today = new Date();
    const { profile } = this.props;
    let user_profile = profile.profile;
    let socialImageUrl = user_profile.socialImageUrl;
    if(user_profile.profilePictureKey) {
      ImageUrl =  {uri:`${config.apiUrl}/profile/image?key=${user_profile.profilePictureKey}`}
    }else if(user_profile.socialImageUrl) {
      ImageUrl =  {uri:socialImageUrl}
		}
    else {
      ImageUrl = Images.leftNavigationPro
		}

		return(
			<Container style={{ marginTop: Metrics.navBarHeight }}>
				<Content>
					<View style={styles.editProfileContainer}>
						<TouchableOpacity
							underlayColor = {Colors.cloud}
							style={styles.profileImageStyle}
							onPress={this.onPressUploadProfileImageButton}>

							{(this.state.avatarSource) ?
									<Image style={styles.profileImageStyle} source={this.state.avatarSource}/> :
									<Image style={styles.profileImageStyle} source={ImageUrl} />
              }
						</TouchableOpacity>
					</View>
					<Form>
						<Text style={{ marginLeft: 10, paddingTop: 15, fontSize: 18, fontFamily: Fonts.Walkthrough.medium }}>First Name</Text>
						<Item floatingLabel last>
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								secureTextEntry={false}
								value = { this.state.firstName }
								style={{ fontWeight:'bold' }}
								onChangeText={(firstName) => {
                	this.setState({ firstName });
              }}/>
						</Item>
						<Text style={{ marginLeft: 10, paddingTop: 15, fontSize: 18, fontFamily: Fonts.Walkthrough.medium }}>Last Name</Text>
						<Item floatingLabel last>
							<Input
								autoCorrect={false}
								autoCapitalize="none"
								secureTextEntry={false}
								value = { this.state.lastName }
								style={{ fontWeight:'bold' }}
								onChangeText={(lastName) => {
									this.setState({ lastName });
								}}/>
						</Item>
					</Form>

					<View style={styles.datePickerStyle}>
						<DatePicker
							style={{ width: width, borderWidth: 0, marginBottom: 10,  }}
							showIcon = { false}
							date={moment(this.state.date, 'YYYY-MM-DD').format("DD MMM YYYY")}
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
							onDateChange={(date) => {this.setState({date: moment(date, 'DD MMM YYYY').format("YYYY-MM-DD")})}}
						/>
					</View>

					<Row style={styles.radioStyle}>
						<RadioForm
							radio_props={radio_props}
							initial={this.state.value}
							buttonColor={Colors.BaseColor}
							onPress={(value) => {
								this.setState({value: value})
							}}
							formHorizontal={true}
							labelStyle={styles.radioBtnStyle}
						/>
					</Row>

					<View style={styles.submitBtnViewStyle}>
						<TouchableOpacity
							underlayColor = {Colors.cloud}
							style={styles.submitBtnStyle}
							onPress={this.onPressEditProfileButton}>
							<Text style={styles.btnTextStyle}>SUBMIT</Text>
						</TouchableOpacity>
					</View>

					<Spinner visible={this.state.isVisible} />
				</Content>
			</Container>
			);
	}
}

export default connect(state => ({
  editProfile: state.editProfile,
  profile : state.profile.profile,
}))(ProfileEditView)