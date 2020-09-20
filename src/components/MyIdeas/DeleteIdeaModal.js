import React from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';
import { useDispatch } from 'react-redux';
import { deleteIdea } from '../../redux/actions/ideas';
import PropTypes from 'prop-types';

const Root = styled('div')`
  padding: 1.875em 3.75em 1em;
  background: ${brandColors.white};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  text-align: center;
`;

const Title = styled('h3')`
  font-size: 1.5em;
  line-height: 1.16;
  margin-bottom: 2.25rem;
`;

const Message = styled('p')`
  margin-bottom: 5rem;
`;

const ButtonWrap = styled('div')`
  display: flex;
  justify-content: space-around;
`;

const Button = styled('button')`
  font-size: 1.125em;
  line-height: 1.33;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  color: ${brandColors.grey};
  border: 1px solid transparent;
  ${props =>
    props.primary &&
    `
    color: ${brandColors.green};
  `}
  &:focus {
    border-color: ${brandColors.green};
  }
`;

export const DeleteIdeaModal = ({ onConfirm, onCancel, options }) => {
  const dispatch = useDispatch();

  const handleOKClick = () => {
    dispatch(deleteIdea({ id: options.id }));
    onConfirm();
  };

  return (
    <Root>
      <Title>Are you sure?</Title>
      <Message>This idea will be permanently deleted.</Message>
      <ButtonWrap>
        <Button id="delete-idea-cancel" onClick={() => onCancel()}>
          CANCEL
        </Button>
        <Button id="delete-idea-ok" primary onClick={handleOKClick}>
          OK
        </Button>
      </ButtonWrap>
    </Root>
  );
};

DeleteIdeaModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  options: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};
