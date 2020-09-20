import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { brandColors } from '../theme/colors';

const Root = styled.div`
  margin-bottom: 0.5em;
`;

const InputWrap = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: 1.25em;
  padding: 0;
  background: ${brandColors.white};
  border-bottom: 1px solid ${brandColors.blueGrey};
  color: ${brandColors.grey};
  height: 2em;
  line-height: 2em;
  width: 100%;
  &:focus + label {
    display: none;
  }
`;

const Label = styled('label')`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: ${brandColors.lightGrey};
`;

const Message = styled.div`
  color: ${brandColors.blueviolet};
  min-height: 1.5em;
  margin: 0.5em 0;
`;

export const TextInput = ({ ...props }) => {
  const { onChange, type, value, placeholder, id, message, required } = props;

  const handleChange = event => {
    onChange(event.target.value);
  };

  return (
    <Root>
      <InputWrap>
        <Input required={required} type={type} id={id} value={value} onChange={handleChange} />
        {!value && <Label htmlFor={id}>{placeholder}</Label>}
      </InputWrap>
      <Message>{message}</Message>
    </Root>
  );
};

TextInput.defaultProps = {
  onChange: Function.prototype,
  type: 'text',
  value: '',
  placeholder: '',
  message: ''
};

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool
};
