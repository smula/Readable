import * as actionTypes from '../actions';

function posts(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_POSTS:
      return action.posts;
    case actionTypes.SET_CATEGORY_POSTS:
      return action.posts;
    default:
      return state;
  }
}
export default posts;
