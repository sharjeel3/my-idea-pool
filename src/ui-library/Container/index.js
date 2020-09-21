import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { media } from '../theme/media';

const StyledContainer = styled.div`
  width: 100%;
  padding-right: 1em;
  padding-left: 1em;
  margin-right: auto;
  margin-left: auto;
  ${media.greaterThan('sm')`
    max-width: 540px;
  `}
  ${media.greaterThan('md')`
    max-width: 720px;   
  `}
  ${media.greaterThan('lg')`
    max-width: 960px;
  `}
  ${media.greaterThan('xlg')`
    max-width: 1140px;
  `}
`;

export const Container = ({ children, className }) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string
};
