import { apiDispatch } from '../../helpers/ApiClient';
import api from '../../helpers/ApiClient';
import config from '../../config/appconfig'
import { Actions as NavActions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

const EDITPROFILE = 'EDITPROFILE';
const EDITPROFILE_SUCCESS = 'EDITPROFILE_SUCCESS';
const EDITPROFILE_FAIL = 'EDITPROFILE_FAIL';


const INTERNET_CONNECTION = 'INTERNET_CONNECTION';

const initialState = {
  isBusy: false,
  ErorMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case EDITPROFILE:
      return { ...state, isBusy: true };
    case EDITPROFILE_SUCCESS:
      return { ...state, isBusy: false, authToken: action.result.accessToken,
        user: action.result.user, ErorMessage: '' };
    case EDITPROFILE_FAIL:
      return { ...state, isBusy: false, ErorMessage: 'Profile not updated, Try again' };

    default:
      return state
  }
}


export function editprofile(data) {
  console.log('data profile', data);
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: EDITPROFILE });
    api
      .put('/profile', data)
      .then((res) => {
        console.log('Edit profile : ',res);
        dispatch({ type: EDITPROFILE_SUCCESS, result: res });
        resolve(res);
      })
      .catch((ex) => {
        console.log('Edit Profile response error : ',ex);
        dispatch({ type: EDITPROFILE_FAIL });
        reject(ex);
      });
  });
}