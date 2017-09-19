import api from '../../helpers/ApiClient';
import config from '../../config/appconfig';
import { Actions as NavActions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import { getprofiledetails, clearprofiledetail } from '../../redux/modules/profile'

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const SIGNUP = 'auth/SIGNUP';
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL';

const FORGOTPASSWORD = 'auth/FORGOTPASSWORD';
const FORGOTPASSWORD_SUCCESS = 'auth/FORGOTPASSWORD_SUCCESS';
const FORGOTPASSWORD_FAIL = 'auth/FORGOTPASSWORD_FAIL';

const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

const INTERNET_CONNECTION = 'INTERNET_CONNECTION';

const initialState = {
  isBusy: false,
  ErorMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOGIN:
      return { ...state, isBusy: true };
    case LOGIN_SUCCESS:
      return { ...state, isBusy: false, authToken: action.result.accessToken,
        user: action.result.user, ErorMessage: '' };
    case LOGIN_FAIL:
      return { ...state, isBusy: false, ErorMessage: 'Invalid Username/Password' };

    case SIGNUP:
      return { ...state, isBusy: true };
    case SIGNUP_SUCCESS:
      return { ...state, isBusy: false, authToken: action.result.accessToken,
        user: action.result.user, ErorMessage: '' };
    case SIGNUP_FAIL:
      return { ...state, isBusy: false, ErorMessage: 'Invalid Username/Password' };

    case INTERNET_CONNECTION:
      return { ... state, hasInternetConnect: action.result };

    default:
      return state
  }
}

export function loginWithSocial(data) {
  return(dispatch, getState) => new Promise((resolve, reject) =>{
    // /* here set url and parameter for signup*/
    dispatch({ type: LOGIN });
    api
      .post('/account/social', data)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, result: res });
        config.AuthToken = res.message.accessToken;
        // console.log('social login response ==>> ',res);
        AsyncStorage.setItem('userData', JSON.stringify(data));
        SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
        });
        NavActions.drawer();
        resolve(res);
      })
      .catch((ex) => {
        dispatch({ type: LOGIN_FAIL});
        reject(ex);
      });
  });
}

export function login(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: LOGIN });
    api
      .post('/sessions?jwt=1', data)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, result: res });
        // console.log('login response ==>> ',res);
        config.AuthToken = res.accessToken;
        AsyncStorage.setItem('userData', JSON.stringify(data));
        SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
        });
        NavActions.drawer();
        resolve(res);
      })
      .catch((ex) => {
        dispatch({ type: LOGIN_FAIL });
        reject(ex);
      });
  });
}

export function forgotpassword(data) {
  return (dispatch, getState) => new Promise((resolve, reject) =>{
    dispatch({ type: FORGOTPASSWORD});
    api
      .post('/account/forgotPassword',data)
      .then((res) => {
        dispatch({ type: FORGOTPASSWORD_SUCCESS, result: res});
        config.AuthToken = res.accessToken;
        resolve(res);
      })
      .catch((ex) => {
        dispatch({ type: FORGOTPASSWORD_FAIL });
        reject(ex);
      });
  });
}


export function signUp(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: SIGNUP });
    api
      .post('/account', data)
      .then((res) => {
        // console.log('SignUp response : ',res);
        dispatch({ type: SIGNUP_SUCCESS, result: res });
        resolve(res);
      })
      .catch((ex) => {
        // console.log('SignUp response error : ',ex);
        dispatch({ type: SIGNUP_FAIL });
        reject(ex);
      });
  });
}

export function setEmptyMsg() {
  return (dispatch) => new Promise((resolve) => {
    dispatch({ type: EmptyMsg });
    resolve();
  });
}
//internet connection validation..
export function setInternetConnection(isconnected) {
  return (dispatch) => new Promise((resolve) => {
    dispatch({type: INTERNET_CONNECTION, result: isconnected});
    resolve();
  });
}

export function changepassword(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    api
      .post('/account/setForgotPassword', data)
      .then((res) => {
        resolve(res);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}
export function logout() {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    api
      .delete('/sessions')
      .then((res) => {
        config.AuthToken = null;
        dispatch(clearprofiledetail());
        NavActions.login();
        resolve(res);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}
