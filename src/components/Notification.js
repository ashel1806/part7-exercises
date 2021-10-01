import React from 'react'

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }else if(message.includes('a new blog')) {
    return (
      <div className="create-succeeds">
        {message}
      </div>
    )
  }else {
    return (
      <div className="loggin-fail">
        {message}
      </div>
    )
  }

}

export default Notification