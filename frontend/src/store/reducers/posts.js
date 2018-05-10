import * as actionTypes from '../actions';

function posts(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_POSTS:
    case actionTypes.SET_CATEGORY_POSTS:
      return action.posts;
    case actionTypes.CREATE_POST:
      return [
        ...state,
        action.post
      ];
    case actionTypes.UPDATE_POST:
    case actionTypes.VOTE_POST:
      state.forEach((post, index) => {
        if (post.id === action.post.id) {
          state.splice(index, 1);
        }
      });
      return [
        ...state,
        action.post,
      ];
    case actionTypes.DELETE_POST:
      state.forEach((post, index) => {
        if (post.id === action.post.id) {
          state.splice(index, 1);
        }
      });
      return [
        ...state,
      ];
    default:
      return state;
  }
}
export default posts;
