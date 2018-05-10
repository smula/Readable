import {
  fetchPosts,
  fetchCategoryPosts,
  updateVotePost,
  edtiPostDetails,
  createNewPost,
  deleteSelectedPost,
} from '../api';

export const SET_POSTS = 'SET_POSTS';
export const SET_CATEGORY_POSTS = 'SET_CATEGORY_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export function getAllPosts() {
  return dispatch => {
    return fetchPosts()
      .then(data => {
        dispatch(setAllPosts(data))
      })
  }
}

export function getCategoryPosts(category) {
  return dispatch => {
    return fetchCategoryPosts(category)
      .then(data => {
        dispatch(setCategoryPosts(data))
      })
  }
}

export function votePosts(params) {
  return dispatch => {
    return updateVotePost(params)
      .then(data => {
        dispatch(votePost(data))
      })
  }
}

export function deletePosts(params) {
  return dispatch => {
    return deleteSelectedPost(params)
      .then(data => {
        dispatch(deletePost(data))
      })
  }
}

export function editPosts(params) {
  return dispatch => {
    return edtiPostDetails(params)
      .then(data => {
        dispatch(votePost(data))
      })
  }
}

export function createPosts(params) {
  return dispatch => {
    return createNewPost(params)
      .then(data => {
        dispatch(createPost(data))
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
  return {
    type: SET_CATEGORY_POSTS,
    posts,
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  }
}

export function editPost(post) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function createPost(post) {
  return {
    type: CREATE_POST,
    post,
  }
}
