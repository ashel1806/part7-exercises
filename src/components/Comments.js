import React from 'react'

const Comments = ({ comments, children }) => {
  return (
    <div>
      <h2>comments</h2>
      {children}
      {
        comments &&
        <ul>
          {
            comments.map(comment =>
              <li key={comment}>
                {comment}
              </li>
            )
          }
        </ul>
      }
    </div>
  )
}

export default Comments