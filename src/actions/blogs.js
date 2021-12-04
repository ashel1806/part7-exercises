import {
  INIT_BLOGS,
  NEW_BLOG,
  LIKE_BLOG,
  DELETE_BLOG,
  COMMENT_BLOG
} from './types'

import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    
    dispatch({
      type: INIT_BLOGS,
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)

    dispatch({
      type: NEW_BLOG,
      data: { newBlog }
    })
  }
}

export const likeBlog = (id, content) => {
  return async dispatch => {
    const blogLiked = { 
      ...content,
      likes: content.likes + 1
    }
    const blogToLike = await blogService.update(id, blogLiked)

    dispatch({
      type: LIKE_BLOG,
      data: { blogToLike }
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)

    dispatch({
      type: DELETE_BLOG,
      data: { id }
    })
  }
}

export const commentBlog = (comment, id) => {
  return async dispatch => {
    const newComment = await blogService.commentBlog(comment, id)

    dispatch({
      type: COMMENT_BLOG,
      data: { newComment }
    })
  }
}
