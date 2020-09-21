import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { media } from '../../ui-library/theme/media';
import { brandColors } from '../../ui-library/theme/colors';

const Input = styled('input')`
  pointer-events: none;
  height: 2.25em;
  line-height: 2.25em;
  width: 100%;
  border-bottom: 1px solid transparent;
  ${media.greaterThan('lg')`
    flex-basis: 65%;
    padding: 0;
    height: 2.75em;
    line-height: 2.75em;
    margin-right: 3.6em;
  `}
  ${props =>
    props.isEditMode &&
    `
    pointer-events: all;
    border-bottom-color: ${brandColors.lightGrey};
  `}
`;

export const TitleInput = ({ value, onChange, isEditMode }) => {
  return (
    <Input
      required
      type="text"
      value={value}
      isEditMode={isEditMode}
      readOnly={!isEditMode}
      onChange={event => onChange(event.target.value)}
    />
  );
};

TitleInput.propTypes = {
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};
