import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'React Library',
      url: 'www.react-testing.com',
      likes: 12,
      user: {
        username: 'ashelDev',
        name: 'Ashel Vasquez'
      }
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders blog content', () => {
    component.debug()

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('at start the url and likes are not displayed', () => {
    const div = component.container.querySelector('.blogView')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, blog details are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogView')
    expect(div).not.toHaveStyle('display: none')

    const url = component.container.querySelector('.blogUrl')
    const likes = component.container.querySelector('.blogLikes')

    expect(url).toHaveTextContent('www.react-testing.com')
    expect(likes).toHaveTextContent('12')
  })

})

describe('testing events on Blog component', () => {
  test('like button calls onClick', () => {
    const updateLikes = jest.fn()

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'React Library',
      url: 'www.react-testing.com',
      likes: 12,
      user: {
        username: 'ashelDev',
        name: 'Ashel Vasquez'
      }
    }

    let component = render(
      <Blog blog={blog} increaseLikes={updateLikes}/>
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})