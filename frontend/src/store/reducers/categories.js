import * as actionTypes from '../actions';

function categories(state = [], action) {
  switch(action.type) {
    case actionTypes.SET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
export default categories;
