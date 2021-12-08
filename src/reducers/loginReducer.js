import {
  LOGIN_APP,
  LOGOUT_APP
} from '../actions/types'

//Vemos si existe algún usuario loggeado en la aplicación
const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'))

//Si el usuario existe el estado inicial cambia
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }

const loginReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case LOGIN_APP:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data.user
      }
    case LOGOUT_APP:
      localStorage.removeItem('loggedBlogAppUser')
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}

export default loginReducer
