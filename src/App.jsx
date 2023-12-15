import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import AppRoutes from './AppRoutes';
import './index.css';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { getStorageUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getStorageUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [dispatch, user]);

  return (
    <div>
      {!user && <LoginForm />}
      {user && <AppRoutes />}
    </div>
  );
};

export default App;
