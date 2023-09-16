import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  test('title and author are rendered, but does not render url and likes by default', () => {
    const user = {
      id: 'userId',
      username: 'sarah',
      name: 'Sarah Jane'
    }

    const blog = {
      title: 'Test Blog',
      author: 'Sarah Jane',
      url: 'https://www.google.com',
      likes: 24,
      user
    }


    const { container } = render(<Blog blog={blog} user={user} />)

    const blogText = screen.getByText('Test Blog Sarah Jane')
    expect(blogText).toBeDefined()

    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')
  })
})