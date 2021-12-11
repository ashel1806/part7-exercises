import {
  INIT_BLOGS,
  NEW_BLOG,
  LIKE_BLOG,
  DELETE_BLOG,
  COMMENT_BLOG
} from '../actions/types'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case INIT_BLOGS:
      return action.data
    case NEW_BLOG:
      //console.log(action.data)
      return [
        ...state,
        action.data
      ]
    case LIKE_BLOG:
      const blogLiked = action.data.blogToLike

      return state.map(blog =>
        blog.id === blogLiked.id ? blogLiked : blog
      )
    case DELETE_BLOG:
      return state.filter(b => b.id !== action.data.id)
    case COMMENT_BLOG:
      const commentedBlog = action.data.newComment
      return state.map(b => b.id === commentedBlog.id ? commentedBlog : b)
    default:
      return state
  }
}

export default blogReducer
