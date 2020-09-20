import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { brandColors } from '../theme/colors';

const Content = styled('div')`
  color: ${brandColors.blueviolet};
  margin: 1em 0;
`;

export const ErrorMessage = ({ message }) => {
  return <Content>{message}</Content>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};
