import React, { Component, PropTypes } from 'react';
import { getSubscriptionStatus } from '../redux/modules/subscribe';
import RNFS from 'react-native-fs';
import config from '../config/appconfig'
import { updateDownloadStoryStatus, deleteDownloadStatus } from '../redux/modules/stories';


export function getDownLoadStatus(dispatch) {
  return (dispatch) => new Promise((resolve, reject) =>{
    dispatch(getSubscriptionStatus())
      .then((res) =>{
        let resultData = {};
        if(res.result.length === 0 && (res.remainingCount === null || res.remainingCount === 0)) {
          resultData = {
            result: res.result,
            remainingCount: res.remainingCount,
            statusCode: 2
          };
          resolve(resultData); // Subscribe first

        } else if(res.result.length > 0 && res.remainingCount === 0) {
          resultData = {
            result: res.result,
            remainingCount: res.remainingCount,
            statusCode: 3
          };
          resolve(resultData);  // Subscription is expired

        } else if(res.remainingCount > 0) {
          resultData = {
            result: res.result,
            remainingCount: res.remainingCount,
            statusCode: 1
          };
          resolve(resultData); // Able to Download the story

        } else {
          resultData = {
            result: res.result,
            remainingCount: res.remainingCount,
            statusCode: 4
          };
          resolve(resultData); // Sometime went wrong
        }
      })
      .catch((error) =>{
        console.log('Error from reduces : ',error);
        reject();
      })
  })
}

export function downLoadStory(dispatch, topstorieslistrow, isWishList){

  let isFree = false;
  if(topstorieslistrow.isFree === 1) {
  isFree = true
  }

  return (dispatch) => new Promise((resolve, reject) => {
    RNFS.exists(`${RNFS.DocumentDirectoryPath}/SunoKahaani`).then(info => {
      if (info) {

        RNFS.exists(`${RNFS.DocumentDirectoryPath}/SunoKahaani/${topstorieslistrow.storyId}.m4a`).then((isExists) => {
          if (isExists) {
            dispatch(updateDownloadStoryStatus(topstorieslistrow, isWishList));
            resolve()
          } else {
            const headers = {
              'Authorization': `bearer ${config.AuthToken}`
            };

            const url = `${config.apiUrl}/story/download?key=${topstorieslistrow.storyKey}&storyId=${topstorieslistrow.storyId}&isFree=${isFree}`;

            RNFS.downloadFile({
              fromUrl: url,
              toFile: `${RNFS.DocumentDirectoryPath}/SunoKahaani/${topstorieslistrow.storyId}.m4a`,
              headers: headers
            }).promise.then((r) => {
              console.log('Response from download : ', r, `${RNFS.DocumentDirectoryPath}/SunoKahaani/${topstorieslistrow.storyId}.m4a`);
              dispatch(updateDownloadStoryStatus(topstorieslistrow, isWishList));
              resolve()
            })
              .catch((error) => {
                console.log('error in downloading : ', error)
              })
          }
        })
      } else {


        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/SunoKahaani`, {
          NSURLIsExcludedFromBackupKey: true
        });
        const headers = {
          'Authorization': `bearer ${config.AuthToken}`
        };

        const url = `${config.apiUrl}/story/download?key=${topstorieslistrow.storyKey}&storyId=${topstorieslistrow.storyId}&isFree=${isFree}`;

        RNFS.downloadFile({
          fromUrl: url,
          toFile: `${RNFS.DocumentDirectoryPath}/SunoKahaani/${topstorieslistrow.storyId}.m4a`,
          headers: headers
        }).promise.then((r) => {
          console.log('Response from download : ', r, `${RNFS.DocumentDirectoryPath}/SunoKahaani/${topstorieslistrow.storyId}.m4a`);
          dispatch(updateDownloadStoryStatus(topstorieslistrow, isWishList));
          resolve()
        })
          .catch((error) => {
            console.log('error in downloading : ', error)
          })
      }
    });
  });

}


export function deleteDownloadStory (storieslistrow) {

  return (dispatch) => new Promise((resolve, reject) => {
    const filepath = `${RNFS.DocumentDirectoryPath}/SunoKahaani/${storieslistrow.storyId}.m4a`;
    RNFS.exists(filepath)
      .then((result) => {
        console.log("file exists: ", result);
        if (result) {
          return RNFS.unlink(filepath)
            .then(() => {
              dispatch(deleteDownloadStatus(storieslistrow))
                .then(() => {
                    console.log('File delete successfully from server');
                })
                .catch((error) =>{
                    console.log('File delete unsuccessfully from server');
                });
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
              console.log(err.message);
            });
        }
        resolve();
      })
      .catch((err) => {
        console.log(err.message);
        reject();
      });
  });
}


export function checkIfStoryExists(dispatch, story) {
  let isFree = false;
  if(story.isFree === 1) {
    isFree = true
  }
  return (dispatch) => new Promise((resolve, reject) => {
    RNFS.exists(`${RNFS.DocumentDirectoryPath}/SunoKahaani`).then(info => {
      console.log('********* path : ',RNFS.DocumentDirectoryPath);
      if (info) {
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/SunoKahaani/${story.storyId}.m4a`).then((isExists) => {
          if (isExists) {
            resolve()
          } else {
            const headers = {
              'Authorization': `bearer ${config.AuthToken}`
            };
            const url = `${config.apiUrl}/story/download?key=${story.storyKey}&storyId=${story.storyId}&isFree=${isFree}`;
            RNFS.downloadFile({
              fromUrl: url,
              toFile: `${RNFS.DocumentDirectoryPath}/SunoKahaani/${story.storyId}.m4a`,
              headers: headers
            }).promise.then((r) => {
              console.log('Response from download : ', r, `${RNFS.DocumentDirectoryPath}/SunoKahaani/${story.storyId}.m4a`);
              resolve()
            })
              .catch((error) => {
                console.log('error in downloading : ', error);
                reject();
              })
          }
        })
      } else {
        RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/SunoKahaani`, {
          NSURLIsExcludedFromBackupKey: true
        });
        const headers = {
          'Authorization': `bearer ${config.AuthToken}`
        };

        const url = `${config.apiUrl}/story/download?key=${story.storyKey}&storyId=${story.storyId}&isFree=${isFree}`;
        RNFS.downloadFile({
          fromUrl: url,
          toFile: `${RNFS.DocumentDirectoryPath}/SunoKahaani/${story.storyId}.m4a`,
          headers: headers
        }).promise.then((r) => {
          console.log('Response from download : ', r, `${RNFS.DocumentDirectoryPath}/SunoKahaani/${story.storyId}.m4a`);
          resolve();
        })
          .catch((error) => {
            console.log('error in downloading : ', error);
            reject();
          })
      }
    });
  });
}

