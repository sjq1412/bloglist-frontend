import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Card, Container } from '@mui/material';
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@mui/icons-material';

import { loginUser } from '../reducers/userReducer';

const fieldStyle = {
  marginTop: 2,
  marginBottom: 2,
  display: 'block',
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!password) setPasswordError(true);
    if (!username) setUsernameError(true);

    if (username && password) {
      setUsernameError(false);
      setPasswordError(false);
      dispatch(loginUser({ username, password }));
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h2" gutterBottom>
        log in
      </Typography>
      <Card sx={{ padding: 2 }}>
        <form noValidate onSubmit={handleLogin}>
          <div>
            <TextField
              color="secondary"
              label="username"
              fullWidth
              required
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              sx={fieldStyle}
              error={usernameError}
            />
          </div>
          <div>
            <TextField
              color="secondary"
              label="password"
              fullWidth
              required
              placeholder="password"
              type="text"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              sx={fieldStyle}
              error={passwordError}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
            endIcon={<KeyboardArrowRightIcon />}
          >
            login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default LoginForm;
