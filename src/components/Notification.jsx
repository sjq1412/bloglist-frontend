import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resetNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
    return () => {};
  }, [notification, dispatch]);

  if (!notification?.message) {
    return null;
  }

  return (
    <div className={`notification ${notification.variant}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
