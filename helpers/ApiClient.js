import { create } from 'apisauce';
import config from '../config/appconfig';

let _getState;
const api = create({
  baseURL: config.apiUrl,
  headers: { Accept: 'application/json' }
});

function apiMethod(method, url, data) {
  return new Promise((resolve, reject) => {
     console.log('* calling', method, url, data);
     console.log('api url', config.apiUrl);

    if (config.AuthToken) {
      //console.log('AuthAPI Token', config.AuthToken);
      api.setHeader('Authorization', `Bearer ${config.AuthToken}`);
    }
    api[method.toLowerCase()](url, data)
      .then(res => {
        if (!res.ok) {
          console.log('response ', res );
          return reject(res);
        }
        return resolve(res.data);
      })
      .catch(reject);
  });
}

export default {
  get: (url) => apiMethod('get', url),
  post: (url, data) => apiMethod('post', url, data),
  put: (url, data) => apiMethod('put', url, data),
  delete: (url) => apiMethod('delete', url),
};

export function apiDispatch(actions, method, url, data = {}) {
  if (!actions || actions.length !== 3) {
    console.warn('apiDispatch called with wrong arg "actions" ', actions);
  }

  if (!method) {
    console.warn('apiDispatch called with missing arg "method" ');
  }

  if (!url) {
    console.warn('apiDispatch called with missing arg "url" ');
  }

  const [REQUEST, SUCCESS, FAIL] = actions;

  return (dispatch) => {
    dispatch({ type: REQUEST });
    apiMethod(method, url, data)
      .then(res => dispatch({ type: SUCCESS, result: res.data }))
      .catch(error => dispatch({ type: FAIL, error }));
  };
}

export function setState(getState) {
  _getState = getState;
}
