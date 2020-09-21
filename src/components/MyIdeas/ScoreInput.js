import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { media } from '../../ui-library/theme/media';
import { brandColors } from '../../ui-library/theme/colors';

const Input = styled('input')`
  border: 1px solid transparent;
  border-radius: 3px;
  height: 2.25em;
  line-height: 2.25em;
  padding: 0 0.5em;
  width: 4em;
  pointer-events: none;
  ${media.greaterThan('lg')`
    margin: 0 0.5em;
  `}
  ${props =>
    props.isEditMode &&
    `
    pointer-events: all;
    background-image: linear-gradient(-180deg, #f2f2f2 0%, #d4d4d4 100%);
    border-color: ${brandColors.border2};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), inset 0 2px 0 0 #ffffff;  
  `}
`;

export const ScoreInput = ({ value, onChange, isEditMode }) => {
  return (
    <Input
      min="1"
      max="10"
      maxLength="2"
      type="number"
      value={value}
      readOnly={!isEditMode}
      isEditMode={isEditMode}
      onChange={event => onChange(Number(event.target.value))}
    />
  );
};

ScoreInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired
};
