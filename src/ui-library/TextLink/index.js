import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '../theme/colors';

const StyledLink = styled(Link)`
  color: ${brandColors.green};
`;

export const TextLink = ({ to, children, className }) => {
  return (
    <StyledLink className={className} to={to}>
      {children}
    </StyledLink>
  );
};

TextLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string
};
