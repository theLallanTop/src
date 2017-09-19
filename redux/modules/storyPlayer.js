
const UPDATE_PLAYER_QUEUE = 'storyPlayer/UPDATE_PLAYER_QUEUE'
const STORY_PLAYED = 'storyPlayer/STORY_PLAYED';
const IS_STORY_PLAYED = 'story/IS_STORY_PLAYED';

const initialState = {
 storyPlayed: null,
  isQueuePlayed: false,
  isStoryPlaying: false,
  queueList: null,
  queueIndex: -1,
  isDeleted: false
};


export default function reducer ( state = initialState, action = {}) {
  switch (action.type){
    case STORY_PLAYED: {
      return {
        ...state,
        storyPlayed: action.result,
        isQueuePlayed: action.flag,
        isStoryPlaying: true,
        queueList: action.queueList,
        queueIndex: action.queueIndex,
        isDeleted: false
      }
    }
    case IS_STORY_PLAYED: {
      return {...state, isStoryPlaying: action.isPlaying, isDeleted: false}
    }

    case UPDATE_PLAYER_QUEUE: {

      if(action.isDeleted) {
        if(action.selectedStory.storyId === state.storyPlayed.storyId) {

          let newQueueList = state.queueList.filter((story) => story.storyId !== action.selectedStory.storyId);
          let index = state.queueIndex+1;
          if(index > newQueueList.length-1) {

            index = 0
          }
          return {
            ...state,
            storyPlayed: state.queueList[index],
            isQueuePlayed: state.isQueuePlayed,
            isStoryPlaying: true,
            queueList: newQueueList,
            queueIndex: state.queueIndex,
            isDeleted: true
          }
        } else {
          let index = state.queueList.findIndex(x => x.storyId === action.selectedStory.storyId);
          if(index < state.queueIndex) {
            let newQueueList = state.queueList.filter((story) => story.storyId !== action.selectedStory.storyId);
            return {...state, queueList: newQueueList, queueIndex: state.queueIndex-1,  isDeleted: false}
          }
          let newQueueList = state.queueList.filter((story) => story.storyId !== action.selectedStory.storyId);
          return {...state, queueList: newQueueList,  isDeleted: false}

        }
      } else { //Adding story in queue

        let isStoryExists = state.queueList.filter((story) => story.storyId === action.selectedStory.storyId);
        if(isStoryExists.length === 1) {
          return {...state}
        }else {
          let addedStory = action.selectedStory;
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
          return { ...state, queueList: newQueueList, queueIndex: state.queueIndex+1, isDeleted: false };

        }
      }
      return {...state, isDeleted: false}
    }
    default:
      return state
  }
}

export function selectStory(story, isQueuePlayed, queueList, queueIndex) {
  return(dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({type: STORY_PLAYED, result: story, flag: isQueuePlayed, queueList, queueIndex });
    resolve();
  })
}

export function storyPlayingStatus(isPlaying) {
  return(dispatch, getState)  => new Promise((resolve, reject) => {
    dispatch({type: IS_STORY_PLAYED, isPlaying});
    resolve();
  })
}

export function updatePlayerQueue(selectedStory, queueList, isDeleted) {  //selectedStory for add/delete
  return(dispatch, getState)  => new Promise((resolve, reject) => {
    dispatch({type: UPDATE_PLAYER_QUEUE, selectedStory, queueList, isDeleted});
    resolve();
  })
}



