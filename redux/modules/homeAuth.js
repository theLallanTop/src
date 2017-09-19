import api from '../../helpers/ApiClient';
import { Actions as NavActions } from 'react-native-router-flux';

const CATEGORIES = 'CATEGORIES';
const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
const CATEGORIES_FAIL = 'CATEGORIES_FAIL';

const NEWSTORIES = 'NEWSTORIES';
const NEWSTORIES_SUCCESS = 'NEWSTORIES_SUCCESS';
const NEWSTORIES_FAIL = 'NEWSTORIES_FAIL';

const CATEGORIESITEMDETAIL = 'CATEGORIESITEMDETAIL';
const CATEGORIESITEMDETAIL_SUCCESS = 'CATEGORIESITEMDETAIL_SUCCESS';
const CATEGORIESITEMDETAIL_FAIL = 'CATEGORIESITEMDETAIL_FAIL';

const initialState = {
  isLoading : false,
  ErrorMessage: '',
  CategoriesResponded: '',
  NewstoriesResponded: '',
  categoriesItemsResponded: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type){
    case CATEGORIES: {
      return { ...state, isLoading: true }
    }
    case CATEGORIES_SUCCESS: {
      return { ...state, isLoading: false, CategoriesResponded: action.result }
    }
    case CATEGORIES_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    case CATEGORIESITEMDETAIL: {
      return { ...state, isLoading: true }
    }
    case CATEGORIESITEMDETAIL_SUCCESS: {
      return { ...state, isLoading: false, categoriesItemsResponded: action.result }
    }
    case CATEGORIESITEMDETAIL_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    case NEWSTORIES: {
      return { ...state, isLoading: true }
    }
    case NEWSTORIES_SUCCESS: {
      return { ...state, isLoading: false, NewstoriesResponded: action.result }
    }
    case NEWSTORIES_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }
    default:
      return state
  }
}

export function getcategorieslist() {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: CATEGORIES });
    api
      .get('/tags')
      .then((res) =>{
        // console.log('categories', res);
        dispatch({ type: CATEGORIES_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) =>{
        dispatch({ type: CATEGORIES_FAIL });
        reject(ex);
      });
  });
}

export function getnewstorieslist(userId) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: NEWSTORIES });
    api
      .get(`/story?sort=latest&isFree=true&userId=${userId}`)
      .then((res) =>{
        console.log('GetnewStoriesList : ',res);
        dispatch({ type: NEWSTORIES_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) =>{
        dispatch({ type: NEWSTORIES_FAIL });
        reject(ex);
      });
  });
}