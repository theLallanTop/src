import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import homeAuth from './homeAuth';
import stories from './stories';
import subscribe from './subscribe';
import myStories from './myStories';
import editProfile from './EditProfile';
import wishlist from './wishlist';
import queue from './queue';
import search from './search';
import storyPlayer from './storyPlayer';
import payment from './payment';
export default combineReducers({
  auth,
  profile,
  homeAuth,
  stories,
  subscribe,
  myStories,
  editProfile,
  wishlist,
  queue,
  search,
  storyPlayer,
  payment
});
