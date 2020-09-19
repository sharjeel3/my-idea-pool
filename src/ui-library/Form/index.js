import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ ...props }) => {
  const { children, onSubmit } = props;
  return (
    <form method="POST" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onSubmit: PropTypes.func
};
