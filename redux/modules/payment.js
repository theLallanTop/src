import api from '../../helpers/ApiClient';

const PAYMENT_OPTION = 'PAYMENT_OPTION';
const SELECTED_PAYMENT_OPTION = 'SELECTED_PAYMENT_OPTION';
const CARD_DETAILS = 'CARD_DETAILS';
const PICKER_VIEW_STATUS = 'PICKER_VIEW_STATUS';
const PICKER_VIEW_MONTH_VALUE = 'PICKER_VIEW_MONTH_VALUE';
const PICKER_VIEW_YEAR_VALUE = 'PICKER_VIEW_YEAR_VALUE';
const PICKER_VIEW_VALUE_CLEAR = 'PICKER_VIEW_VALUE_CLEAR';
const PAYMENT_OPTION_INFO_CLEAR = 'PAYMENT_OPTION_INFO_CLEAR';
const PAYMENT_COMPLETE_INFO = 'PAYMENT_COMPLETE_INFO';
const POST_PAYMENT_INFO_TO_SERVER = 'POST_PAYMENT_INFO_TO_SERVER';

const initialState = {
  paymentOption: null,
  selectedPaymentInfo: null,
  cardDetails: null,
  pickerViewIsOpen: false,
  month: null,
  expiryYear: null,
  isMonth: null,
  paymentComplete: null
};

export default function reducer ( state = initialState, action = {}) {
  switch (action.type){
    case PAYMENT_OPTION: {
      return { ...state, paymentOption: action.result }
    }
    case SELECTED_PAYMENT_OPTION: {
      return { ...state, selectedPaymentInfo: action.result }
    }
    case CARD_DETAILS: {
      return { ...state, cardDetails: action.result }
    }
    case PICKER_VIEW_STATUS: {
      return { ...state, pickerViewIsOpen: action.result, isMonth: action.month }
    }
    case PICKER_VIEW_MONTH_VALUE: {
      return { ...state, pickerViewIsOpen: action.result, month: action.month }
    }
    case PICKER_VIEW_YEAR_VALUE: {
      return { ...state, pickerViewIsOpen: action.result, expiryYear: action.year }
    }
    case PICKER_VIEW_VALUE_CLEAR: {
      return { ...state, pickerViewIsOpen: false, expiryYear: null, month: null }
    }
    case PAYMENT_OPTION_INFO_CLEAR: {
      return { ...state, selectedPaymentInfo: null, cardDetails: null, }
    }
    case PAYMENT_COMPLETE_INFO: {
      return { ...state, paymentComplete: action.result }
    }
    case POST_PAYMENT_INFO_TO_SERVER: {
      return { ...state, paymentComplete: null }
    }
    default:
      return state
  }
}

export function postPaymentOptions(paymentInfo) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: PAYMENT_OPTION, result: paymentInfo});
    resolve();
  });
}

export function selectedpaymentInfo(selectedPaymentOption) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: SELECTED_PAYMENT_OPTION, result: selectedPaymentOption});
    resolve();
  })
}

export function saveCardDetails(cardinfo) {

  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: CARD_DETAILS, result: cardinfo});
    resolve();
  })
}

export function pickerViewUpdateStatus(isOpen, isMonth) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: PICKER_VIEW_STATUS, result: isOpen, month: isMonth});
    resolve();
  })
}

export function pickerViewMonthValue(month, isOpen) {

  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: PICKER_VIEW_MONTH_VALUE, result: isOpen, month: month});
    resolve();
  })
}

export function pickerViewYearValue(year, isOpen) {

  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: PICKER_VIEW_YEAR_VALUE, result: isOpen, year: year});
    resolve();
  })
}

export function pickerViewclearValue() {

  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: PICKER_VIEW_VALUE_CLEAR});
    resolve();
  })
}

export function paymentInfoClear() {

  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: PAYMENT_OPTION_INFO_CLEAR});
    resolve();
  })
}

export function paymentCompleted(paymentInfo) {
  return(dispatch, getState) => new Promise((resolve) => {
    dispatch({type: PAYMENT_COMPLETE_INFO, result: paymentInfo});
    resolve();
  })
}

export function postPaymentToServer(paymentInfo) {
  return(dispatch, getState) => new Promise((resolve) => {
    api
      .post('/payment/processing', paymentInfo)
      .then((res) => {
        dispatch({type: POST_PAYMENT_INFO_TO_SERVER });
        resolve(res);
      })
      .catch((error) => {
        reject();
      });
  })
}




