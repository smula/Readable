import { fetchComments, postComment, updateComment, deleteComment, voteComment } from '../api';

export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function getPostComments(postId) {
  return dispatch => {
    return fetchComments(postId)
      .then(data => {
        dispatch(setPostsComments(data))
      })
  }
}

export function createPostComments(params) {
  return dispatch => {
    return postComment(params)
    .then(data => {
      dispatch(createComment(data))
    })
  }
}

export function updatePostComments(params) {
  return dispatch => {
    return updateComment(params)
    .then(data => {
      dispatch(updateComments(data))
    })
  }
}

export function deletePostComments(params) {
  return dispatch => {
    return deleteComment(params)
    .then(data => {
      dispatch(deleteComments(data))
    })
  }
}

export function votePostComments(params) {
  return dispatch => {
    return voteComment(params)
    .then(data => {
      dispatch(voteComments(data))
    })
  }
}

export function setPostsComments(comments) {
  return {
    type: SET_COMMENTS,
    comments,
  }
}

export function createComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function updateComments(comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  }
}

export function deleteComments(comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}

export function voteComments(comment) {
  return {
    type: VOTE_COMMENT,
    comment,
  }
}
