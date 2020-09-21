import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { brandColors } from '../theme/colors';
import { isValidElementType } from 'react-is';

const Root = styled('div')`
  border-bottom: 1px solid ${brandColors.border};
  padding: 2em 0;
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled('h2')`
  font-size: 1.75em;
  line-height: 1.17;
`;

export const PageHeader = ({ title, Action }) => {
  return (
    <Root>
      <Title>{title}</Title>
      {Action && <Action />}
    </Root>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  Action: isValidElementType
};
