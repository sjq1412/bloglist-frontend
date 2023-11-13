import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const blog = action.payload;
      state.push(blog);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    like(state, action) {
      const id = action.payload;
      const blogs = state.map((blog) => {
        return blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 };
      });
      return blogs;
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, like, setBlogs, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch(appendBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const blogObject = {
      content: blog.content,
      likes: blog.likes + 1,
    };

    const updatedBlog = await blogService.update(id, blogObject);
    dispatch(like(updatedBlog.id));
  };
};

export default blogSlice.reducer;
