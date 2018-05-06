import { fetchCategories, fetchCategory } from '../api';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export function getAllCategories() {
  return dispatch => {
    return fetchCategories()
    .then(data => {dispatch(setAllCategories(data))})
  }
}

export function setAllCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  }
}
