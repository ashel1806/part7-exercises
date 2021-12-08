import React from 'react'

const CommentForm = ({ handleComment }) => {
  const addComment = e => {
    e.preventDefault()

    const content = e.target.comment.value
    e.target.comment.value = ''

    handleComment(content)
  }

  return (
    <form onSubmit={addComment}>
      <input name="comment" />
      <button type="submit" id="add-comment">add comment</button>
    </form>
  )
}

export default CommentForm