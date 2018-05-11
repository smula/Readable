import uuidv4 from 'uuid/v4';

const api = "http://localhost:3001";

// Generate a unique token for storing.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () =>
  fetch(`${api}/categories`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res.categories)

export const fetchCategoryPosts = (category) => {
  return fetch(`${api}/${category}/posts`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res)}

export const fetchPosts = () =>
  fetch(`${api}/posts`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res)

export const fetchSinglePost = ({ postId }) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res)

export const createNewPost = ({ title, body, author, category }) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    }),
  })
    .then(res => res.json())
    .then(res => res)

export const edtiPostDetails = ({ title, body, postId }) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then(res => res.json())
    .then(res => res)

export const deleteSelectedPost = ({ postId }) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res)

export const updateVotePost = ({ postId, voteType }) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: voteType,
    }),
  })
    .then(res => res.json())
    .then(res => res)



export const fetchComments = (postId) => 
  fetch(`${api}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res)

export const postComment = ({ body, author, parentId }) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      body,
      author,
      parentId,
    }),
  })
    .then(res => res.json())
    .then(res => res)

export const updateComment = ({ body, commentId }) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body,
    }),
  })
    .then(res => res.json())
    .then(res => res);

export const deleteComment = ({ commentId }) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => res)

export const voteComment = ({ commentId, voteType }) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: voteType,
    }),
  })
    .then(res => res.json())
    .then(res => res)
