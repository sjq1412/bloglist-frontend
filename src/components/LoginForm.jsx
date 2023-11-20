import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log({ username, password });

    dispatch(loginUser({ username, password }));
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            placeholder="password"
            type="text"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
