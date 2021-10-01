import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const newBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={newBlog} />
  )

  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Ashel Joseph V.' }
  })

  fireEvent.change(url, {
    target: { value: 'www.my-first-blog.com' }
  })

  fireEvent.change(title, {
    target: { value: 'My first Blog' }
  })
  fireEvent.submit(form)

  expect(newBlog.mock.calls).toHaveLength(1)
  console.log(newBlog.mock.calls[0][0].title)
  expect(newBlog.mock.calls[0][0].author).toEqual('Ashel Joseph V.')
  expect(newBlog.mock.calls[0][0].url).toEqual('www.my-first-blog.com')
  expect(newBlog.mock.calls[0][0].title).toEqual('My first Blog')
})