import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  let container
  let mockHandler

  beforeEach(() => {
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
    mockHandler = jest.fn()

    container = render(<Blog blog={blog} user={user} like={mockHandler} />).container
  })

  test('title and author are rendered, but does not render url and likes by default', () => {
    const blogText = screen.getByText('Test Blog Sarah Jane')
    expect(blogText).toBeDefined()

    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('URL and number of likes are shown when view button has been clicked', async () => {
    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')

    const mockUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await mockUser.click(viewButton)

    expect(blogDetails).not.toHaveStyle('display: none')
  })

  test('event handler will be called twice when like button is clicked twice', async () => {
    const mockUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await mockUser.click(viewButton)

    const likeButton = container.querySelector('.likeButton')
    await mockUser.click(likeButton)
    await mockUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})