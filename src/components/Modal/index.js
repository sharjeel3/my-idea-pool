import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { getModalContent, getModalOptions, isModalActive } from '../../redux/selectors/modal';
import { DELETE_IDEA_MODAL } from '../../app/constants/modal';
import { DeleteIdeaModal } from '../MyIdeas/DeleteIdeaModal';
import { hideModal } from '../../redux/actions/modal';

const Root = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled('div')`
  padding: 0;
`;

const getModalView = content => {
  switch (content) {
    case DELETE_IDEA_MODAL:
      return DeleteIdeaModal;
    default:
      return null;
  }
};

export const Modal = () => {
  const isActive = useSelector(isModalActive);
  const content = useSelector(getModalContent);
  const options = useSelector(getModalOptions);
  const dispatch = useDispatch();

  if (!isActive || !content) {
    return null;
  }

  const closeModal = () => {
    dispatch(hideModal());
  };

  const ModalComponent = getModalView(content);

  if (!ModalComponent) {
    return null;
  }
  ModalComponent.displayName = 'ModalComponent';

  return (
    <Root>
      <Content>
        <ModalComponent options={options} onCancel={closeModal} onConfirm={closeModal} />
      </Content>
    </Root>
  );
};
