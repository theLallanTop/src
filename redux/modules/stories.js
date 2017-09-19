import api from '../../helpers/ApiClient';
import { updateWishListAfterDownloading } from '../../redux/modules/wishlist';
import { getmystorieslist } from '../../redux/modules/myStories';
const TOPSTORIES = 'TOPSTORIES';
const TOPSTORIES_SUCCESS = 'TOPSTORIES_SUCCESS';
const TOPSTORIES_FAIL = 'TOPSTORIES_FAIL';

const TOPSTORIESNEWEST = 'TOPSTORIESNEWEST';
const TOPSTORIESNEWEST_SUCCESS = 'TOPSTORIESNEWEST_SUCCESS';
const TOPSTORIESNEWEST_FAIL = 'TOPSTORIESNEWEST_FAIL';

const TOPSTORIESOLDEST = 'TOPSTORIESOLDEST';
const TOPSTORIESOLDEST_SUCCESS = 'TOPSTORIESOLDEST_SUCCESS';
const TOPSTORIESOLDEST_FAIL = 'TOPSTORIESOLDEST_FAIL';

const FREESTORIES = 'FREESTORIES';
const FREESTORIES_SUCCESS = 'FREESTORIES_SUCCESS';
const FREESTORIES_FAIL = 'FREESTORIES_FAIL';

const FREESTORIESNEWEST = 'FREESTORIESNEWEST';
const FREESTORIESNEWEST_SUCCESS = 'FREESTORIESNEWEST_SUCCESS';
const FREESTORIESNEWEST_FAIL = 'FREESTORIESNEWEST_FAIL';

const FREESTORIESOLDEST = 'FREESTORIESOLDEST';
const FREESTORIESOLDEST_SUCCESS = 'FREESTORIESOLDEST_SUCCESS';
const FREESTORIESOLDEST_FAIL = 'FREESTORIESOLDEST_FAIL';

const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL';

const DOWNLOAD_DELETE = 'DOWNLOAD_DELETE';
const DOWNLOAD_DELETE_SUCCESS = 'DOWNLOAD_DELETE_SUCCESS';
const DOWNLOAD_DELETE_FAIL = 'DOWNLOAD_DELETE_FAIL';

const CATEGORIESNEWEST = 'CATEGORIESNEWEST';
const CATEGORIESNEWEST_SUCCESS = 'CATEGORIESNEWEST_SUCCESS';
const CATEGORIESNEWEST_FAIL = 'CATEGORIESNEWEST_FAIL';

const CATEGORIESOLDEST = 'CATEGORIESOLDEST';
const CATEGORIESOLDEST_SUCCESS = 'CATEGORIESOLDEST_SUCCESS';
const CATEGORIESOLDEST_FAIL = 'CATEGORIESOLDEST_FAIL';

const CLEARDATALIST = 'CLEARDATALIST';

const initialState = {
  isLoading: false,
  ErrorMessage: '',
  StoriesResponded: undefined,

  FreeNewStories: undefined,
  FreeOldStories: undefined,
  TopOldStories: undefined,
  TopNewStories: undefined,

  categoriesNewStories: undefined,
  categoriesOldStories: undefined,

  storiesname: undefined,
};

export default function reducer ( state = initialState, action = {}) {
  switch (action.type){

    //Top Stories list

    // case TOPSTORIES: {
    //   return { ...state, isLoading: true }
    // }
    // case TOPSTORIES_SUCCESS: {
    //   if(state.StoriesResponded === undefined) {
    //     return { ...state, isLoading: false, StoriesResponded: action.result }
    //   }else {
    //     let topstorieslist = state.StoriesResponded;
    //     let story = action.result;
    //     let isLoad = false;
    //     for (i = 0; i < story.length; i++) {
    //       topstorieslist.push(story[i]);
    //     }
    //     return { ...state, isLoading: false, StoriesResponded: topstorieslist }
    //   }
    // }
    // case TOPSTORIES_FAIL: {
    //   return { ...state, isLoading: false, ErrorMessage: 'error' }
    // }

    //Top Stories Newest

    case TOPSTORIESNEWEST: {
      return { ...state, isLoading: true }
    }
    case TOPSTORIESNEWEST_SUCCESS: {
      if(state.TopNewStories === undefined) {
        return { ...state, isLoading: false, TopNewStories: action.result, storiesname: 'TopNewStories' }
      }else {
        let topstorieslist = state.TopNewStories;
        let story = action.result;
        let isLoad = false;
        for (i = 0; i < story.length; i++) {
          topstorieslist.push(story[i]);
        }
        return { ...state, isLoading: false, TopNewStories: topstorieslist, storiesname: 'TopNewStories' }
      }
    }
    case TOPSTORIESNEWEST_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error', storiesname: 'TopNewStories' }
    }


    //Top Stories Oldest

    case TOPSTORIESOLDEST: {
      return { ...state, isLoading: true }
    }
    case TOPSTORIESOLDEST_SUCCESS: {
      if(state.TopOldStories === undefined) {
        return { ...state, isLoading: false, TopOldStories: action.result, storiesname: 'TopOldStories' }
      }else {
        let topstorieslist = state.TopOldStories;
        let story = action.result;
        let isLoad = false;
        for (i = 0; i < story.length; i++) {
          topstorieslist.push(story[i]);
        }
        return { ...state, isLoading: false, TopOldStories: topstorieslist, storiesname: 'TopOldStories' }
      }
    }
    case TOPSTORIESOLDEST_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error', storiesname: 'TopOldStories' }
    }

//Free Stories list
//     case FREESTORIES: {
//       return { ...state, isLoading: true }
//     }
//
//
//     case FREESTORIES_SUCCESS: {
//       if(state.StoriesResponded === undefined){
//         return { ...state, isLoading: false, StoriesResponded: action.result }
//       }else{
//         let freestories = state.StoriesResponded;
//         let story = action.result;
//         for( i = 0; i< story.length; i++){
//           freestories.push(story[i]);
//         }
//         return { ...state, isLoading: false, StoriesResponded: freestories}
//       }
//     }
//     case FREESTORIES_FAIL: {
//       return { ...state, isLoading: false, ErrorMessage: 'error' }
//     }

    //Free Stories Newest

    case FREESTORIESNEWEST: {
      return { ...state, isLoading: true }
    }
    case FREESTORIESNEWEST_SUCCESS: {
      if(state.FreeNewStories === undefined){
        return { ...state, isLoading: false, FreeNewStories: action.result, storiesname: 'FreeNewStories' }
      }else{
        let freestories = state.FreeNewStories;
        let story = action.result;
        for( i = 0; i< story.length; i++){
          freestories.push(story[i]);
        }
        return { ...state, isLoading: false, FreeNewStories: freestories, storiesname: 'FreeNewStories'}
      }
    }
    case FREESTORIESNEWEST_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error', storiesname: 'FreeNewStories' }
    }

    //Free Stories Oldest

    case FREESTORIESOLDEST: {
      return { ...state, isLoading: true }
    }
    case FREESTORIESOLDEST_SUCCESS: {
      if(state.FreeOldStories === undefined){
        return { ...state, isLoading: false, FreeOldStories: action.result, storiesname: 'FreeOldStories' }
      }else{
        let freestories = state.FreeOldStories;
        let story = action.result;
        for( i = 0; i< story.length; i++){
          freestories.push(story[i]);
        }
        return { ...state, isLoading: false, FreeOldStories: freestories, storiesname: 'FreeOldStories'}
      }
    }
    case FREESTORIESOLDEST_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    // categories list

    case  CATEGORIESNEWEST: {
      return{ ...state, isLoading: true }
    }
    case  CATEGORIESNEWEST_SUCCESS: {
      if(state.categoriesNewStories === undefined){
        return { ...state, isLoading: false, categoriesNewStories: action.result, storiesname: 'CategoriesNewStories' }
      }else{
        let freestories = state.categoriesNewStories;
        let story = action.result;
        for( i = 0; i< story.length; i++){
          freestories.push(story[i]);
        }
        return { ...state, isLoading: false, categoriesNewStories: freestories, storiesname: 'CategoriesNewStories'}
      }
    }
    case  CATEGORIESNEWEST_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    // categories list

    case  CATEGORIESOLDEST: {
      return{ ...state, isLoading: true }
    }
    case  CATEGORIESOLDEST_SUCCESS: {
      if(state.categoriesOldStories === undefined){
        return { ...state, isLoading: false, categoriesOldStories: action.result, storiesname: 'CategoriesOldStories' }
      }else{
        let freestories = state.categoriesOldStories;
        let story = action.result;
        for( i = 0; i< story.length; i++){
          freestories.push(story[i]);
        }
        return { ...state, isLoading: false, categoriesOldStories: freestories, storiesname: 'CategoriesOldStories'}
      }
    }
    case  CATEGORIESOLDEST_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'error' }
    }

    case DOWNLOAD_SUCCESS: {

      let storiesresponse = undefined;
      switch (state.storiesname){
        case 'TopNewStories':{
          storiesresponse = state.TopNewStories;
          break;
        }
        case 'TopOldStories':{
          storiesresponse = state.TopOldStories;
          break;
        }
        case 'FreeOldStories': {
          storiesresponse = state.FreeOldStories;
          break;
        }
        case 'FreeNewStories':{
          storiesresponse = state.FreeNewStories;
          break;
        }
        case 'CategoriesOldStories': {
          storiesresponse = state.categoriesOldStories;
          break;
        }
        case 'CategoriesNewStories': {
          storiesresponse = state.categoriesNewStories;
          break;
        }
      }

      // console.log('storiesresponse=======================>>>>>>>>',storiesresponse);

      let updatedStories = storiesresponse.filter((story) => story.storyId !== action.result.storyId);
      let index = storiesresponse.findIndex(x => x.storyId === action.result.storyId);
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
      switch (state.storiesname){
        case 'TopNewStories':{
          return {...state, TopNewStories: updatedStories };
          break;
        }
        case 'TopOldStories':{
          return {...state, TopOldStories: updatedStories };
          break;
        }
        case 'FreeOldStories': {
          return {...state, FreeOldStories: updatedStories };
          break;
        }
        case 'FreeNewStories':{
          return {...state, FreeNewStories: updatedStories };
          break;
        }
        case 'CategoriesOldStories': {
          return {...state, categoriesOldStories: updatedStories };
          break;
        }
        case 'CategoriesNewStories': {
          return {...state, categoriesNewStories: updatedStories };
          break;
        }
      }
    }

    case DOWNLOAD_DELETE: {
      return { ...state, isLoading: true }
    }

    case DOWNLOAD_DELETE_SUCCESS: {
      return { ...state, isLoading: false, StoriesResponded:  action.result }
    }

    case DOWNLOAD_DELETE_FAIL: {
      return { ...state, isLoading: false, ErrorMessage: 'Download fail'}
    }

    case CLEARDATALIST: {
      return { ...state, StoriesResponded: undefined}
    }

    default:
      return state
  }
}

// export function gettopstories(page,userId) {
//   return (dispatch, getState) => new Promise ((resolve, reject) => {
//     dispatch({ type: TOPSTORIES });
//     api
//       .get(`/story/top?page=${page}&userId=${userId}`)
//       .then((res) => {
//         dispatch({ type: TOPSTORIES_SUCCESS, result: res });
//         resolve();
//       })
//       .catch((ex) => {
//       dispatch({ type: TOPSTORIES_FAIL });
//       reject(ex);
//       });
//   });
// }

export function gettopstoriesoldest(page,userId) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: TOPSTORIESOLDEST });
    api
       .get(`/story/top?page=${page}&userId=${userId}&sort=oldest`)
      // .get(`/story?page=${page}&sort=oldest&isFree=false&userId=${userId}`)
      .then((res) => {

        dispatch({ type: TOPSTORIESOLDEST_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) => {
        dispatch({ type: TOPSTORIESOLDEST_FAIL });
        reject(ex);
      });
  });
}

export function gettopstoriesnewest(page,userId) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: TOPSTORIESNEWEST });
    api
      //story?page=0&sort=latest&isFree=false&userId=4
      .get(`/story/top?page=${page}&userId=${userId}&sort=latest`)
      // .get(`/story?page=${page}&sort=latest&isFree=false&userId=${userId}`)
      .then((res) => {
        dispatch({ type: TOPSTORIESNEWEST_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) => {
        dispatch({ type: TOPSTORIESNEWEST_FAIL });
        reject(ex);
      });
  });
}

export function getfreestories(page,userId) {
  console.log("userId + sort: ",userId);
  return (dispatch, getState) => new Promise ((resolve, reject) =>{
    dispatch({ type: FREESTORIES });
    api
      .get(`/story?page=${page}&isFree=true&userId=${userId}`)
      .then((res) => {
        dispatch({ type: FREESTORIES_SUCCESS, result: res });
      resolve();
      })
      .catch((ex) => {
        dispatch({ type: TOPSTORIES_FAIL });
      reject(ex);
      });
  });
}


export function getfreestoriesoldest(page,userId) {
  console.log("userId + sort: ",userId);
  return (dispatch, getState) => new Promise ((resolve, reject) =>{
    dispatch({ type: FREESTORIESOLDEST });
    api
      .get(`/story?page=${page}&sort=oldest&isFree=true&userId=${userId}`)
      .then((res) => {
        dispatch({ type: FREESTORIESOLDEST_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) => {
        dispatch({ type: FREESTORIESOLDEST_FAIL });
        reject(ex);
      });
  });
}

export function getfreestoriesnewest(page,userId) {
  console.log("userId + sort: ",userId);
  return (dispatch, getState) => new Promise ((resolve, reject) =>{
    dispatch({ type: FREESTORIESNEWEST });
    api
      .get(`/story?page=${page}&sort=latest&isFree=true&userId=${userId}`)
      .then((res) => {
        dispatch({ type: FREESTORIESNEWEST_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) => {
        dispatch({ type: FREESTORIESNEWEST_FAIL });
        reject(ex);
      });
  });
}


export function updateDownloadStoryStatus(story, isWishList) {

  let isFree = false;
  if(story.isFree === 1) {
    isFree = true
  }
  return(dispatch, getState) => new Promise((resolve, reject) =>{
    api
      .get(`/story/updateDownloadStatus?storyId=${story.storyId}&isFree=${isFree}`)
      .then((res) => {
        if(isWishList){
          dispatch(updateWishListAfterDownloading(story))
        } else {
          dispatch({type: DOWNLOAD_SUCCESS, result: story})
        }
      })
      .catch((error) => {
        if(isWishList) {

        }else {
          dispatch({type: DOWNLOAD_FAIL})
        }
      })
  })
}

export function deleteDownloadStatus(story) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: DOWNLOAD_DELETE});
    api
      .delete(`/story/${story.storyId}`)
      .then((response) => {
        console.log('Download data delete successfully');
        dispatch(getmystorieslist());
        dispatch({ type: DOWNLOAD_DELETE_SUCCESS, result: response });
        resolve();
      })
      .catch((error) => {
        dispatch({ type: DOWNLOAD_DELETE_FAIL});
      reject(error);
      });
  });
}


// export function getcategoriesItemDetail(kahaaniID, userId,sort) {
//   return (dispatch, getState) => new Promise ((resolve, reject) => {
//     dispatch({ type: TOPSTORIES });
//     api
//       .get(`/story/${kahaaniID}/${userId}?sort=latest`)
//       .then((res) =>{
//         console.log("getCategories item detail stories reducer: ", res)
//         dispatch({ type: TOPSTORIES_SUCCESS, result: res });
//         resolve();
//       })
//       .catch((ex) =>{
//         dispatch({ type: TOPSTORIES_FAIL });
//         reject(ex);
//       });
//   });
// }

export function getcategoriesItemDetailNewest(kahaaniID, userId) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: CATEGORIESNEWEST });
    api
      .get(`/story/${kahaaniID}/${userId}?sort=latest`)
      .then((res) =>{
        console.log("getCategories item detail stories reducer: ", res);
        dispatch({ type: CATEGORIESNEWEST_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) =>{
        dispatch({ type: CATEGORIESNEWEST_FAIL });
        reject(ex);
      });
  });
}

export function getcategoriesItemDetailOldest(kahaaniID, userId) {
  return (dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: CATEGORIESOLDEST });
    api
      .get(`/story/${kahaaniID}/${userId}?sort=oldest`)
      .then((res) =>{
        console.log("getCategories item detail stories reducer: ", res);
        dispatch({ type: CATEGORIESOLDEST_SUCCESS, result: res });
        resolve();
      })
      .catch((ex) =>{
        dispatch({ type: CATEGORIESOLDEST_FAIL });
        reject(ex);
      });
  });
}

export function dataclearwithunmount() {
  return(dispatch, getState) => new Promise ((resolve, reject) => {
    dispatch({ type: CLEARDATALIST});
  })
}