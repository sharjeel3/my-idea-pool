import { HIDE_MODAL, SHOW_MODAL } from '../../actionTypes';

export const showModal = ({ content, options = {} }) => ({
  type: SHOW_MODAL,
  content,
  options
});

export const hideModal = () => ({
  type: HIDE_MODAL
});
