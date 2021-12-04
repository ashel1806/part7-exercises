import {
  INIT_BLOGS,
  NEW_BLOG,
  LIKE_BLOG,
  DELETE_BLOG
} from '../actions/types'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case INIT_BLOGS:
      return action.data
    case NEW_BLOG:
      return [
        ...state,
        action.data.newBlog
      ]
    case LIKE_BLOG:
      const blogLiked = action.data.blogToLike

      return state.map(blog => 
        blog.id === blogLiked.id ? blogLiked : blog  
      )
    case DELETE_BLOG:
      return state.filter(b => b.id !== action.data.id)
    default: 
      return state
  }
}

export default blogReducer
