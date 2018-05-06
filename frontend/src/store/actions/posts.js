import { fetchPosts, fetchCategoryPosts } from '../api';

export const SET_POSTS = 'SET_POSTS';
export const SET_CATEGORY_POSTS = 'SET_CATEGORY_POSTS';

export function getAllPosts() {
  return dispatch => {
    return fetchPosts()
      .then(data => {
        dispatch(setAllPosts(data))
      })
  }
}

export function getCategoryPosts(category) {
  console.log({ category })
  return dispatch => {
    console.log('why is this not working?')
    return fetchCategoryPosts(category)
      .then(data => {
        console.log({data});
        dispatch(setCategoryPosts(data))
      })
  }
}

export function setAllPosts(posts) {
  return {
    type: SET_POSTS,
    posts,
  }
}

export function setCategoryPosts(posts) {
  console.log(posts)
  return {
    type: SET_CATEGORY_POSTS,
    posts,
  }
}
