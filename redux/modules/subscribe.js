import api from '../../helpers/ApiClient';
import { Actions as NavActions } from 'react-native-router-flux';

const SUBSCRIBE = 'SUBSCRIBE';
const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';
const SUBSCRIBE_FAIL = 'SUBSCRIBE_FAIL';
const SELECTED_SUBSCRIPTION_PACKAGE = 'SELECTED_SUBSCRIPTION_PACKAGE';
const SUBSCRIPTION_INFO = 'SUBSCRIPTION_INFO';

const SUBSCRIPTION_PLAN = 'SUBSCRIPTION_PLAN';


const EXPIRE_SUBSCRIPTION_PLAN = 'EXPIRE_SUBSCRIPTION_PLAN';
const EXPIRE_SUBSCRIPTION_PLAN_SUCCESS = 'EXPIRE_SUBSCRIPTION_PLAN_SUCCESS';
const EXPIRE_SUBSCRIPTION_PLAN_FAIL = 'EXPIRE_SUBSCRIPTION_PLAN_FAIL';


const initialState = {
  isLoading: false,
  ErrorMessage: '',
  subscribeResponded: '',
  selectedSubScriptionPackage: null,
  subscriptionInfo: null,
  subscribePlan: null,
  ExpirePlan: undefined
};

export default function reducer ( state = initialState, action = {}) {
  switch (action.type){
    case SUBSCRIBE: {
      return { ...state, isLoading: true }
    }
    case SUBSCRIBE_SUCCESS: {
      return { ...state, isLoading: false, subscribeResponded: action.result }
    }
    case SUBSCRIBE_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    case SELECTED_SUBSCRIPTION_PACKAGE: {
      return {...state, selectedSubScriptionPackage: action.result}
    }

    case SUBSCRIPTION_PLAN: {
      return {...state, isLoading: false, subscribePlan: action.result}
    }

    case SUBSCRIPTION_INFO: {
      return {...state, subscriptionInfo: action.result}
    }

    case EXPIRE_SUBSCRIPTION_PLAN: {
      return { ...state, isLoading: true }
    }
    case EXPIRE_SUBSCRIPTION_PLAN_SUCCESS:{
      return { ...state, isLoading: false, ExpirePlan: action.result }
    }
    case EXPIRE_SUBSCRIPTION_PLAN_FAIL: {
      return { ...state, isLoading: false}
    }

    default:
      return state
  }
}

export function getsubscribelist() {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: SUBSCRIBE });
    api
      .get('/subscription')
      .then((res) => {
        console.log('subscribe', res);
        dispatch({ type: SUBSCRIBE_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) => {
        dispatch({ type: SUBSCRIBE_FAIL });
        reject(ex);
      });
  });
}

export function getSubscriptionStatus() {
  return(dispatch, getState) => new Promise((resolve, reject) =>{
    api
      .get('subscription/userSubscription?page=0&sort=latest')
      .then((res) =>{
        console.log('Response subscription ==>> ',res);
        dispatch({type: SUBSCRIPTION_INFO, result: res});
        resolve(res.result);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export function getSubscriptionPopUp() {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    api
      .get('/subscription/userCurrentSubscription')
      .then((response) => {
        // console.log('Expire Plan subscription ==>> ',response);
        resolve(response);
      })
      .catch((error) =>{
        reject(error);
      })
  })
}



export function getSubscriptionPlan(data) {
  console.log('data for plan ==>>', data);
  return(dispatch, getState) => new Promise((resolve, reject) =>{
    api
      .post('subscription/plan', data)
      .then((res) =>{
        console.log('Res : ',res);
        dispatch({type: SUBSCRIPTION_PLAN, result: res});
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
  })
}


export function selectSubscriptionPackage(selectedpackage) {
  return(dispatch, getState) => new Promise((resolve, reject) =>{
    dispatch({type: SELECTED_SUBSCRIPTION_PACKAGE, result: selectedpackage})
  })
}









