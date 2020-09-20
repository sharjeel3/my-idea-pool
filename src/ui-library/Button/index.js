import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { brandColors } from '../theme/colors';

const StyledButton = styled('button')`
  background-color: ${brandColors.green};
  color: ${brandColors.white};
  font-size: 0.875em;
  line-height: 1;
  padding: 0.75em 4em;
  text-transform: uppercase;
  border: 1px solid ${brandColors.green};
  &:focus {
    background-color: ${brandColors.lightGreen};
  }
`;

export const Button = ({ children, onClick, className }) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};
