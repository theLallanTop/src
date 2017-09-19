import api from '../../helpers/ApiClient';
import { Actions as NavActions } from 'react-native-router-flux';

const MYSTORIES = 'MYSTORIES';
const MYSTORIES_SUCCESS = 'MYSTORIES_SUCCESS';
const MYSTORIES_FAIL = 'MYSTORIES_FAIL';

const GET_MYLIKE = 'GET_MYLIKE';
const GET_MYLIKE_SUCCESS = 'GET_MYLIKE_SUCCESS';
const GET_MYLIKE_FAIL = 'GET_MYLIKE_FAIL';

const UPDATE_MYLIKE_SUCCESS = 'UPDATE_MYLIKE_SUCCESS';
const UPDATE_MYLIKE_FAIL = 'UPDATE_MYLIKE_FAIL';

const RATING_UPDATE_SUCCESS = 'RATING_UPDATE_SUCCESS';
const RATING_UPDATE_FAIL = 'RATING_UPDATE_FAIL';

const RECENT_DOWNLOAD = 'RECENT_DOWNLOAD';
const RECENT_DOWNLOAD_SUCCESS = 'RECENT_DOWNLOAD_SUCCESS';
const RECENT_DOWNLOAD_FAIL = 'RECENT_DOWNLOAD_FAIL';

const MYSTORIESLISTUPDATE = 'MYSTORIESLISTUPDATE';


const initialState = {
  isLoading : false,
  ErrorMessage: '',
  myStoriesResponded: null,
  myLikeResponded: null,
  rating: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type){
    case MYSTORIES: {
      return { ...state, isLoading: true }
    }
    case MYSTORIES_SUCCESS: {
      return { ...state, isLoading: false, myStoriesResponded: action.result }
    }
    case MYSTORIES_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }
    case GET_MYLIKE: {
      return { ...state, isLoading: true }
    }
    case GET_MYLIKE_SUCCESS: {
      return { ...state, isLoading: false, myLikeResponded: action.result }
    }
    case GET_MYLIKE_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }
    case RATING_UPDATE_SUCCESS: {
      return { ...state, isLoading: false, rating: action.result }
    }
    case RATING_UPDATE_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    case UPDATE_MYLIKE_SUCCESS: {
      let likeList = state.myLikeResponded;
      let storyList = action.result;
      let isLikedStory = likeList.filter((story) => story.storyId === storyList.storyId);
      if(isLikedStory.length === 1) {
        let list = isLikedStory[0];
        let newLikedList = {
          createdAt: list.createdAt,
          id: list.id,
          isLiked: !list.isLiked,
          likedBy: list.likedBy,
          storyId: list.storyId,
          updatedAt: list.updatedAt,
          description: isLikedStory[0].description,
          title: isLikedStory[0].title
        };
        let newLikeResponded = state.myLikeResponded.filter((liked) => liked.id !== newLikedList.id)
        newLikeResponded.push(newLikedList);
        return {...state, myLikeResponded: newLikeResponded }
      } else {
        let story = action.story;
        let newLikedList = {
          createdAt: storyList.createdAt,
          id: storyList.id,
          isLiked: storyList.isLiked,
          likedBy: storyList.likedBy,
          description: story.description,
          title: story.title,
          storyId: storyList.storyId,
          updatedAt: storyList.updatedAt
        };
        let newLikeResponded = state.myLikeResponded;
        newLikeResponded.push(newLikedList);
        return { ...state, myLikeResponded: newLikeResponded }
      }
    }

    case UPDATE_MYLIKE_FAIL: {
      return {...state}
    }


    case RECENT_DOWNLOAD: {
      return { ...state, isLoading: true, ErrorMessage: 'error' }
    }

    case RECENT_DOWNLOAD_SUCCESS: {
      return { ...state, isLoading: false, myStoriesResponded: action.result }
    }

    case RECENT_DOWNLOAD_FAIL: {
      return { ...state, isLoading: false, ErrorMessage:'error'}
    }

    default:
      return state
  }
}

export function getmystorieslist() {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: MYSTORIES });
    api
      .get('story/listDownloads?page=0&sort=latest')
      .then((res) => {
        console.log('categories', res);

        dispatch({ type: MYSTORIES_SUCCESS, result: res });
        resolve(res);
      })
      .catch((ex) => {
        dispatch({ type: MYSTORIES_FAIL });
        reject(ex);
      });
  });
}

export function getmylikelist() {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: GET_MYLIKE });
    api
      .get('/like')
      .then((res) =>{
        dispatch({ type: GET_MYLIKE_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) =>{
        dispatch({ type: GET_MYLIKE_FAIL });
        reject(ex);
      });
  });
}

export function likeStory(story) {
  return (dispatch, getState) => new Promise ((resolve, reject) =>{
    api
      .post(`/like/${story.storyId}`)
      .then((res) => {
        console.log('res: ', res);
        if(res.statusCode === undefined) {
          console.log('Status code : ', res);
          dispatch({type: UPDATE_MYLIKE_SUCCESS, result: res, story: story})
        } else{
          console.log('Status code 200: ', res);
          dispatch({type: UPDATE_MYLIKE_SUCCESS, result: story})
        }
        resolve(res);
      })
      .catch((error) =>{
        reject(error);
      })
  })
}

export function recentDownload(page){
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: RECENT_DOWNLOAD });
    api
      .get('/story/listDownloads')
      .then((res) =>{
        dispatch({ type: RECENT_DOWNLOAD_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) =>{
        dispatch({ type: RECENT_DOWNLOAD_FAIL });
        reject(ex);
      });
  });
}


export function storyrate(storyid, rate) {
  return (dispatch, getState) => new Promise ((resolve, reject) =>{
    api
      .post(`/rating/${storyid}/${rate}`)
      .then((res) => {
        console.log('rating response: ', res);

        resolve(res);
      })
      .catch((error) =>{
        reject(error);
      })
  })
}

// export function updatelistafterDelete() {
//   return(dispatch, getState)  => new Promise((resolve, reject) => {
//     dispatch({type: });
//     resolve();
//   })
// }