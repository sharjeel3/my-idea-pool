import { DELETE_IDEA_MODAL } from '../../../app/constants/modal';

export const isModalActive = store => store.modal.isActive;
export const getModalContent = store => store.modal.content;
export const getModalOptions = store => store.modal.options;
export const isDeleteIdeaModalActive = store =>
  store.modal.isActive && store.modal.content === DELETE_IDEA_MODAL;
