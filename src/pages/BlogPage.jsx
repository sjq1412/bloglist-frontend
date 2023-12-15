import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Link as LinkIcon,
  ThumbUp as ThumbUpIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { setNotification } from '../reducers/notificationReducer';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

import Comments from '../components/Comments';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  const handleLike = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id);
      if (!blog) {
        dispatch(
          setNotification({ message: 'Blog not found', variant: 'error' }),
        );
      } else {
        dispatch(likeBlog(id, blog));
      }
    } catch (error) {
      console.error({ error });
      dispatch(
        setNotification({
          message: error.response.data.error,
          variant: 'error',
        }),
      );
    }
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id));
        navigate('/');
        dispatch(
          setNotification({
            message: `Successfully removed ${blog.title} by ${blog.author}`,
            variant: 'success',
          }),
        );
      } catch (error) {
        console.error({ error });
        dispatch(
          setNotification({
            message: error.response.data.error,
            variant: 'error',
          }),
        );
      }
    }
  };

  if (!blog) return <Typography color="error">Blog not found</Typography>;

  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar>{blog.author[0].toUpperCase()}</Avatar>}
          title={
            <Typography variant="h4" color="secondary">
              {blog.title} {blog.author}
            </Typography>
          }
          subheader={
            blog?.user && (
              <Typography color="info">added by {blog?.user?.name}</Typography>
            )
          }
          action={
            blog.user &&
            user.username === blog.user?.username && (
              <Tooltip title="Delete this blog">
                <IconButton
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => handleRemove(blog)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )
          }
        />
        <CardContent>
          <div>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinkIcon />
              <a href={blog.url} target="_blank" rel="noreferrer">
                {blog.url}
              </a>
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="like this blog">
                <IconButton
                  variant="contained"
                  color="secondary"
                  className="likeButton"
                  onClick={() => handleLike(blog.id)}
                  sx={{ left: -8 }}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
              <span className="likes">{blog.likes || 0}</span>
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Comments blog={blog} />
    </div>
  );
};

export default BlogPage;
