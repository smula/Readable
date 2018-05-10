import * as actionTypes from '../actions';

function comments(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_COMMENTS:
      return action.comments;
    case actionTypes.ADD_COMMENT:
      return [
        ...state,
        action.comment
      ];
    case actionTypes.VOTE_COMMENT:
    case actionTypes.UPDATE_COMMENT:
      state.forEach((comment, index) => {
        if (comment.id === action.comment.id) {
          state.splice(index, 1);
        }
      });
      return [
        ...state,
        action.comment,
      ];
    case actionTypes.DELETE_COMMENT:
      state.forEach((comment, index) => {
        if (comment.id === action.comment.id) {
          state.splice(index, 1);
        }
      });
      return [...state];
    default:
      return state;
  }
}
export default comments;
