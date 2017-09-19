import api from '../../helpers/ApiClient'
const GET_WISHLIST_SUCCESS = 'wishlist/GET_WISHLIST_SUCCESS';
const GET_WISHLIST_FAIL = 'wishlist/GET_WISHLIST_FAIL';

const ADD_TO_WISHLIST_SUCCESS = 'wishlist/ADD_TO_WISHLIST_SUCCESS';
const ADD_TO_WISHLIST_FAIL = 'wishlist/ADD_TO_WISHLIST_FAIL';

const DELETE_FROM_WISHLIST_SUCCESS = 'wishlist/DELETE_FROM_WISHLIST_SUCCESS';
const DELETE_FROM_WISHLIST_FAIL = 'wishlist/DELETE_FROM_WISHLIST_FAIL';

const UPDATE_WISHLIST = 'wishlist/UPDATE_WISHLIST';

const initialState = {
  wishListData: null,
};


export  default function reducer(state = initialState, action={}) {
  switch(action.type) {

    case GET_WISHLIST_SUCCESS: {
      return {...state, wishListData: action.result}
    }
    case GET_WISHLIST_FAIL: {
      return {...state}
    }

    case ADD_TO_WISHLIST_SUCCESS : {
      let wishlist = state.wishListData;
      let listdata = wishlist.filter((story) => story.storyId !== action.result.storyId);
      let story = action.result;
      listdata.push({
        storyId: story.storyId,
        title: story.title,
      });
      return {...state, wishListData: listdata }
    }

    case ADD_TO_WISHLIST_FAIL: {
      return {...state}
    }

    case DELETE_FROM_WISHLIST_SUCCESS: {
      let wishList = state.wishListData;
      let listdata = wishList.filter((story) => story.storyId !== action.result.storyId);
      return {...state, wishListData: listdata}
    }

    case DELETE_FROM_WISHLIST_FAIL: {
      return {...state}
    }

    case UPDATE_WISHLIST: {
      let updatedStories = state.wishListData.filter((story) => story.storyId !== action.result.storyId);
      let index = state.wishListData.findIndex(x => x.storyId === action.result.storyId);
      let story = action.result;
      let newStory = {
        contentType: story.contentType,
        description: story.description,
        downloadedStoryId: story.storyId,
        fileName: story.fileName,
        storyId: story.storyId,
        storyKey: story.storyKey,
        tagId: story.tagId,
        title: story.title,
        titleLower: story.titleLower
      };
      updatedStories.splice(index, 0, newStory);
      return {...state, wishListData: updatedStories}
    }

    default:
      return state

  }
}


export function getWishList() {
  console.log('from reducer get wishlist called');
  return (dispatch, getState) => new Promise((resolve, reject) => {
    api
      .get('/whishlist?page=0&sort=latest')
      .then((res) =>{
        console.log('wishlist', res);
        dispatch({type: GET_WISHLIST_SUCCESS, result: res});
        resolve()
      })
      .catch((error) => {
        dispatch({type: GET_WISHLIST_FAIL});
        reject()
      })
  })
}

export function addToWishList(story) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    console.log('storyid', story);
    api
      .post(`/whishlist/${story.storyId}`)
      .then((res) => {
        dispatch({type: ADD_TO_WISHLIST_SUCCESS, result: story});
        // dispatch(getWishList());
        resolve()
      })
      .catch((error) =>{
        dispatch({type: ADD_TO_WISHLIST_FAIL});
        reject()
      })
  })
}

export function deletefromWishlist(story) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    console.log('storyid', story);
    api
      .delete(`/whishlist/${story.storyId}`)
      .then((res) => {
        dispatch({type: DELETE_FROM_WISHLIST_SUCCESS, result: story});
        resolve();
      })
      .catch((error) => {
        dispatch({type: DELETE_FROM_WISHLIST_FAIL});
        reject();
      })
  })
}

export function updateWishListAfterDownloading(story) {
  return(dispatch) => new Promise((resolve, reject) =>{
    dispatch({type: UPDATE_WISHLIST, result: story})
  })
}
