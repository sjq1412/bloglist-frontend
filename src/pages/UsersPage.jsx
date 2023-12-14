import React from 'react';
import { Typography } from '@mui/material';
import Users from '../components/Users';

const UsersPage = () => {
  return (
    <div>
      <Typography variant="h4" color="secondary">
        Users
      </Typography>
      <Users />
    </div>
  );
};

export default UsersPage;
