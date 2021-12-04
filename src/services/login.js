import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  return await axios
    .post(baseUrl, credentials)
    .then(res => {
      if (res.data.token) {
        //console.log(res.data)
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(res.data))
      }

      return res.data
    })
}

const logout  = () => {
  localStorage.removeItem('loggedBlogAppUser')
}

export default { login, logout } 
