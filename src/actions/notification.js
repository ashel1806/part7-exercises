import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  CLEAR_NOTIFICATION
} from './types'

export const setNotification = ( message, time ) => {
  return dispatch => {
    const timetoShowTextId = setTimeout(() => {
      dispatch({
        type: HIDE_NOTIFICATION
      })
    }, time * 1000)

    dispatch({
      type: CLEAR_NOTIFICATION,
      message,
      tId: timetoShowTextId
    })

    dispatch({
      type: SHOW_NOTIFICATION,
      message,
      tId: timetoShowTextId
    })
  }
}
