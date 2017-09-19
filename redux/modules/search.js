import api from '../../helpers/ApiClient';
import config from '../../config/appconfig';

const SEARCH = 'SEARCH';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_FAIL = 'SEARCH_FAIL';


const UPDATE_SEARCH_LIST = 'UPDATE_SEARCH_LIST';

const initialState = {
  isLoading: false,
  ErrorMessage: undefined,
  filter: undefined,
};

export default function reducer ( state = initialState, action = {}) {
  switch (action.type){
    case SEARCH: {
      return { ...state, isLoading: true }
    }
    case SEARCH_SUCCESS: {
      return { ...state, isLoading: false, filter: action.result }
    }
    case SEARCH_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    case UPDATE_SEARCH_LIST: {
       return {...state, filter: []}
    }

    default:
      return state
  }
}

export function search(searchkey) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    console.log('search====>> ', searchkey);
    dispatch({ type: SEARCH });
    api
      .get(`/search?search=${searchkey}`)
      .then((res) => {
      console.log('res', res);
      if(res.statusCode === undefined){
        dispatch({ type: SEARCH_SUCCESS, result: res });
      }else {
        dispatch(updateSearchList())
      }
        resolve(res);
      })
      .catch((ex) => {
        dispatch({ type: SEARCH_FAIL });
        reject(ex);
      });
  });
}

export function updateSearchList() {
  return(dispatch) => new Promise(() =>{
    dispatch({type: UPDATE_SEARCH_LIST });
  })
}
