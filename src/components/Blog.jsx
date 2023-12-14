import { Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingY: 1,
    paddingX: 2,
    marginBottom: 2,
  };

  return (
    <Paper className="blog" sx={blogStyle}>
      <Typography variant="h5" gutterBottom>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </Typography>
    </Paper>
  );
};

export default Blog;
