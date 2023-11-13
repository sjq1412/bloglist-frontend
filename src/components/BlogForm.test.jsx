import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('BlogForm component', () => {
  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandler = jest.fn();

    render(<BlogForm createBlog={mockHandler} />);

    const user = userEvent.setup();
    const titleInput = screen.getByPlaceholderText('title');
    const authorInput = screen.getByPlaceholderText('author');
    const urlInput = screen.getByPlaceholderText('url');

    await user.type(titleInput, 'Test Blog 2023');
    await user.type(authorInput, 'Sarah Jane');
    await user.type(urlInput, 'my website');

    const saveButton = screen.getByText('create');
    await user.click(saveButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: 'Test Blog 2023',
      author: 'Sarah Jane',
      url: 'my website',
    });
  });
});
