import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../actions/types'

const initialNotification = {
  text: '',
  timeId: null
}

const notificationReducer = ( state = initialNotification, action ) => {
  switch(action.type) {
    case SHOW_NOTIFICATION:
      return {
        text: action.message,
        timeId: action.tId
      }
    case HIDE_NOTIFICATION:
      return {
        text: '',
        timeId: null
      }
    case CLEAR_NOTIFICATION:
      clearTimeout(state.tId)

      return {
        text: action.message,
        timeId: action.tId
      }
    default: 
      return state
  }
}

export default notificationReducer
