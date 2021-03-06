import axios from 'axios'
const baseUrl = 'https://blogs-backend-app.herokuapp.com/api/blogs'

const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'))

let config

if (user && user.token) {
  config = {
    headers: { Authorization: `bearer ${user.token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const update = async (id, blog) => {
  const response =  await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const commentBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)

  return response.data
}

export default {
  getAll,
  create,
  update,
  deleteBlog,
  commentBlog
}
