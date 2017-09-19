import api from '../../helpers/ApiClient';
import config from '../../config/appconfig';
import { Actions as NavActions } from 'react-native-router-flux';

const PROFILE = 'PROFILE';
const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const PROFILE_FAIL = 'PROFILE_FAIL';

const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
const SIGNOUT_FAIL = 'SIGNOUT_FAIL';

const SWITCH_STATUS = 'SWITCH_STATUS';

const SWITCH_STATUS_PIN_SUCCESS = 'SWITCH_STATUS_PIN_SUCCESS';
const SWITCH_STATUS_PIN_FAIL = 'SWITCH_STATUS_PIN_FAIL';

const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

const RECOVER_CHILDMODE_PIN = 'RECOVER_CHILDMODE_PIN';
const RECOVER_CHILDMODE_PIN_SUCCESS = 'RECOVER_CHILDMODE_PIN_SUCCESS';
const RECOVER_CHILDMODE_PIN_FAIL = 'RECOVER_CHILDMODE_PIN_FAIL';


const CHANGE_CHILDMODE_PIN = 'CHANGE_CHILDMODE_PIN';
const CHANGE_CHILDMODE_PIN_SUCCESS = 'CHANGE_CHILDMODE_PIN_SUCCESS';
const CHANGE_CHILDMODE_PIN_FAIL = 'CHANGE_CHILDMODE_PIN_FAIL';

const CLEAR_PROFILE = 'CLEAR_PROFILE';

const initialState = {
  error: null,
  profile: null,
  isLoading: false,
  isSignOut: false,
  isSwitchOn: false,
  pin: null,
  totalProDetail: null,
  changePinStatus: null,
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case PROFILE: {
      return {...state, isLoading: true};
    }

    case PROFILE_SUCCESS: {
      return {...state, isLoading: false, profile: action.result.user, totalProDetail: action.result};
    }

    case PROFILE_FAIL: {
      return {...state, isLoading: false, error: 'Error'};
    }

    case SIGNOUT_SUCCESS: {
      return {...state, profile: null, isSignOut: true};
    }

    case SIGNOUT_FAIL: {
      return {...state, error: 'Error', isSignOut: false};
    }

    case SWITCH_STATUS: {
      return {...state, isSwitchOn: action.isOn };
    }

    case SWITCH_STATUS_PIN_SUCCESS: {
      return { ...state, pin: action.result.pin };
    }

    case SWITCH_STATUS_PIN_FAIL: {
      return { ...state, error: 'Error' };
    }

    case CHANGE_CHILDMODE_PIN: {
      return { ...state, isLoading: true };
    }

    case CHANGE_CHILDMODE_PIN_SUCCESS: {
      return { ...state, isLoading: false, changePinStatus: action.result }
    }

    case CHANGE_CHILDMODE_PIN_FAIL: {
      return { ...state, isLoading: false, error: 'Error'}
    }

    case RECOVER_CHILDMODE_PIN: {
      return { ...state, isLoading: true };
    }

    case RECOVER_CHILDMODE_PIN_SUCCESS: {
      return { ...state, pin: action.result};
    }

    case RECOVER_CHILDMODE_PIN_FAIL: {
      return { ...state, error: 'Recover child mode pin fail'};
    }

    case CLEAR_PROFILE: {
      return { ...state, profile: null, totalProDetail: null, isSwitchOn: false }
    }

    default:
      return state;
  }
}

export function getprofiledetails() {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: PROFILE });
    api
      .get('/sessions')
      .then((res) => {
        console.log('profile',res);
        dispatch({ type: PROFILE_SUCCESS, result: res });
        dispatch(switchStatus(res.user.childmodeStatus));
        resolve();
      })
      .catch((ex) => {
        dispatch({ type: PROFILE_FAIL });
        reject(ex);
      });
  });
}

export function signout() {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: SIGNOUT_SUCCESS });
    resolve();
  })
}

export function switchStatus(isSwitchOn) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: SWITCH_STATUS, isOn: isSwitchOn});
    resolve();
  })
}

export function childModeStatusUpdate(pin) {

  return(dispatch, getState) => new Promise((resolve, reject) => {
    api
      .post('/childmode', pin)
      .then((res) => {
        // console.log('Res Lock--->>: ',res);
        if(res.statusCode === 200) {
          dispatch(getprofiledetails());
          dispatch(switchStatus(res.childmodeStatus));
          resolve();
        }
      })
      .catch((ex) => {
        // console.log('Reject : ',ex);
        reject()
      })
  })
}


export function requestToCreateChildModePin(childmodepin) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: CHANGE_CHILDMODE_PIN });
    api
      .put('/childmode',childmodepin)
      .then((res) => {
         console.log('reset pin ======================>>>> : ',res);
        if(res.statusCode === 200) {
          dispatch({ type: CHANGE_CHILDMODE_PIN_SUCCESS, result: res });
          dispatch(getprofiledetails());
        }
        resolve(res);
      })
      .catch((ex) => {
        // console.log('Reject : ',ex);
        dispatch({ type: CHANGE_CHILDMODE_PIN_FAIL });
        reject(ex)
      })
  })
}


export function requestPinForChildMode() {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    api
      .get('/childmode')
      .then((res) => {
        if(res.statusCode === 200) {
          dispatch(getprofiledetails());
          resolve(res)
        }
      })
      .catch((ex) => {
        reject(ex);
      })
  })
}


export function requestForForgotChildModePin() {
  return(dispatch, getState) => new Promise((resolve, reject ) => {
    dispatch({ type: RECOVER_CHILDMODE_PIN });
    api
      .get('/childmode/forgot')
      .then((res) => {
        console.log('Recover pin --->> ', res);
        dispatch({ type: RECOVER_CHILDMODE_PIN_SUCCESS, result: res });
        // let message = `Here, ${res.childPIn}`;
        resolve(res);
      })
      .catch((ex) =>{
        dispatch({ type: RECOVER_CHILDMODE_PIN_FAIL});
        reject(ex);
      })
  })
}

export function clearprofiledetail() {
  return(dispatch) => new Promise(() =>{
    dispatch({type: CLEAR_PROFILE });
  })
}
