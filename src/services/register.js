import axios from "axios"
const baseUrl = 'https://blogs-backend-app.herokuapp.com/api/users'

const register = async credentials => {
  return await axios
    .post(baseUrl, credentials)
    .then(res => console.log(res.data))
}

export default { register }