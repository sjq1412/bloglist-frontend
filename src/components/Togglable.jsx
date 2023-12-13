import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired };

export default Togglable;
