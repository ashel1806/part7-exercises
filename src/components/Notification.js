import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { text } = useSelector(state => state.notification)

  if (!text) return null
  else if (text.includes('a new blog')){
    return (
      <div className="create-succeeds">
        {text}
      </div>
    )
  }
  else {
    return (
      <div className="loggin-fail">
        {text}
      </div>
    )
  }
}

export default Notification
