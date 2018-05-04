import api from '..';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function getAllCategories() {
  return dispatch => {
    api
      .get('/categories')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      });
  }
}