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
    comment(state, action) {
      const { id, comments } = action.payload;
      const blogs = state.map((blog) => {
        return blog.id !== id ? blog : { ...blog, comments };
      });
      return blogs;
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, like, setBlogs, comment, removeBlog } =
  blogSlice.actions;

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

export const commentToBlog = (id, data) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, data);
    dispatch(comment(updatedBlog));
  };
};

export default blogSlice.reducer;
