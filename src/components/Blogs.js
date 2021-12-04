import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
              .sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWith: 1,
    marginBottom: 5,
  }

  return (
    <div>
    {
      blogs.map(b => 
        <div key={b.id} style={blogStyle}>
          <Link to={`/blogs/${b.id}`}>
            {b.title} {b.author}
          </Link>
        </div>
      )
    }
    </div>
  )
}

export default Blogs
