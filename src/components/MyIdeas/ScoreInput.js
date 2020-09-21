import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Input = styled('input')`
  background-image: linear-gradient(-180deg, #f2f2f2 0%, #d4d4d4 100%);
  border: 1px solid #979797;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), inset 0 2px 0 0 #ffffff;
  border-radius: 3px;
  height: 2.25em;
  line-height: 2.25em;
  padding: 0 0.5em;
  width: 4em;
`;

export const ScoreInput = ({ value, onChange }) => {
  return (
    <Input
      min="1"
      max="10"
      maxLength="2"
      type="number"
      value={value}
      onChange={event => onChange(Number(event.target.value))}
    />
  );
};

ScoreInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
