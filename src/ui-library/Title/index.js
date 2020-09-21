import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled('div')`
  margin: 4em 0;
  text-align: center;
`;

const Text = styled('h2')`
  font-size: 2.5em;
  line-height: 1.175;
`;

export const Title = ({ title }) => {
  return (
    <Root>
      <Text>{title}</Text>
    </Root>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};
