import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
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
          sx={{ mb: 2 }}
          size="large"
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
          sx={{ mb: 2 }}
          size="large"
          endIcon={<CloseIcon />}
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
