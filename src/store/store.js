import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import blogReducer from "../reducers/blogReducer"
import notificationReducer from "../reducers/notificationReducer"
import loginReducer from "../reducers/loginReducer"
import usersReducer from "../reducers/usersReducer"

import { composeWithDevTools } from 'redux-devtools-extension'

//import loginService from '../services/login'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)


export default store
