import * as actionTypes from '../actions';

function categories(state = [], action) {
  switch(action.type) {
    case actionTypes.GET_CATEGORIES:
      console.log(action)
      return action;
    default:
      return state;
  }
}
export default categories;
