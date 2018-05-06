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
  console.log('lets fetch')
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

