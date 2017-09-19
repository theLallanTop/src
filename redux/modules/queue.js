import api from '../../helpers/ApiClient';
import config from '../../config/appconfig'
import { Actions as NavActions } from 'react-native-router-flux';
const GET_QUEUE = 'queue/GET_QUEUE';
const GET_QUEUE_SUCCESS = 'queue/GET_QUEUE_SUCCESS';
const GET_QUEUE_FAIL = 'queue/GET_QUEUE_FAIL';

const ADD_QUEUE_SUCCESS = 'queue/ADD_QUEUE_SUCCESS';
const ADD_QUEUE_FAIL = 'queue/ADD_QUEUE_FAIL';

const DELETE_FROM_QUEUE_SUCCESS = 'queue/DELETE_FROM_QUEUE_SUCCESS';
const DELETE_FROM_QUEUE_FAIL = 'queue/DELETE_FROM_QUEUE_FAIL';

const initialState = {
  error: null,
  queueList: null,
  isLoading: false
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {

    case GET_QUEUE: {
      return {...state, isLoading: true}
    }

    case GET_QUEUE_SUCCESS:
      return {...state, isLoading: false, queueList: action.result};

    case GET_QUEUE_FAIL:
      return {...state, isLoading: false };

    case ADD_QUEUE_SUCCESS:
      let isStoryExists = state.queueList.filter((story) => story.id === action.id);
      if(isStoryExists.length === 1) {
        return {...state}
      }else {
        let addedStory =  action.result;
        let newQueueList = state.queueList;
        let queue = {
          description: addedStory.description,
          fileName: addedStory.fileName,
          id: action.id,
          storyId: addedStory.storyId,
          storyKey: addedStory.storyKey,
          title: addedStory.title
        };
        newQueueList.splice(0, 0, queue);

        return {...state, queueList: newQueueList };
      }


    case ADD_QUEUE_FAIL:
      return {...state };

    case DELETE_FROM_QUEUE_SUCCESS:
      let newQueueList = state.queueList.filter((story) => story.storyId !== action.result.storyId);
      return {...state, queueList: newQueueList};

    case DELETE_FROM_QUEUE_FAIL:
      return {...state };

    default:
      return state;
  }
}

export function getQueueList() {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: GET_QUEUE});
    api
      .get('/queue?page=0&sort=latest')
      .then((response) => {
        dispatch({type: GET_QUEUE_SUCCESS, result: response});
        resolve();
      })
      .catch((error) => {
        dispatch({type: GET_QUEUE_FAIL});
        reject();
      })
  })
}

export function addToQueueList(story) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    api
      .post(`/queue/${story.storyId}`)
      .then((response) => {
        console.log('story: ',story)
        dispatch({type: ADD_QUEUE_SUCCESS, result: story, id: response.queueId});
        resolve();
      })
      .catch((error) => {
        dispatch({type: ADD_QUEUE_FAIL});
        reject();
      })
  })
}

export function deleteFromQueueList(story) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    api
      .delete(`/queue/${story.storyId}`)
      .then((res) => {
        console.log('res => ',res);
        dispatch({type: DELETE_FROM_QUEUE_SUCCESS, result: story,})
      })
      .catch((error) => {
        console.log('Error : ',error);
        dispatch({type: DELETE_FROM_QUEUE_FAIL})
      })
  })
}



