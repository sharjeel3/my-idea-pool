import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../ui-library/Container';
import {
  addIdea,
  addNewIdeaScaffold,
  deleteNewIdeaScaffold,
  fetchIdeas,
  updateIdea
} from '../../redux/actions/ideas';
import { getMyIdeas, isFetchIdeasInProgress } from '../../redux/selectors/ideas';
import { Idea } from './Idea';
import { showModal } from '../../redux/actions/modal';
import { DELETE_IDEA_MODAL } from '../../app/constants/modal';
import { PageHeader } from '../../ui-library/PageHeader';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { media } from '../../ui-library/theme/media';
import { getModalOptions, isDeleteIdeaModalActive } from '../../redux/selectors/modal';
import { IdeaHeader } from './IdeaHeader';

// Ideally API response should return total number of pages that we can use to paginate
const PAGE = 1;

const Root = styled(Container)`
  ${media.greaterThan('lg')`
    padding: 0 5%;
    ${props =>
      !props.hasIdeas &&
      `
      display: flex;
      flex-direction: column;
    `}
  `}
  ${media.greaterThan('xlg')`
    padding: 0 9.5%;
  `}
`;

const AddIdeaButton = styled('button')`
  width: 2em;
  height: 2em;
  ${media.greaterThan('lg')`
    width: 3.125em;
    height: 3.125em;
  `}
`;

const AddIdea = ({ onClick }) => {
  return (
    <AddIdeaButton onClick={onClick}>
      <img src="/add.png" alt="Add an idea" />
    </AddIdeaButton>
  );
};

AddIdea.propTypes = {
  onClick: PropTypes.func.isRequired
};

const HasIdeasWrap = styled('div')`
  margin: 5em 0;
  text-align: center;
  img {
    margin-bottom: 1.4375em;
  }
  ${media.greaterThan('lg')`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
  `}
`;

export const MyIdeas = () => {
  const dispatch = useDispatch();
  const ideas = useSelector(getMyIdeas);
  const isFetchingIdeas = useSelector(isFetchIdeasInProgress);
  const isDeleteIdeaModalActiveNow = useSelector(isDeleteIdeaModalActive);
  const activeModalOptions = useSelector(getModalOptions);

  const hasIdeas = ideas.length > 0;

  useEffect(() => {
    dispatch(fetchIdeas({ page: PAGE }));
  }, [dispatch]);

  const handleDeleteClick = id => {
    dispatch(
      showModal({
        content: DELETE_IDEA_MODAL,
        options: { id }
      })
    );
  };

  const handleEditConfirmClick = ({ id, impact, ease, confidence, content }) => {
    dispatch(updateIdea({ id, impact, ease, confidence, content }));
  };

  const handleAddIdeaClick = () => {
    dispatch(addNewIdeaScaffold());
  };

  const handleAddIdeaCancelClick = id => {
    dispatch(deleteNewIdeaScaffold(id));
  };

  const handleAddIdeaConfirmClick = ({ id, content, impact, ease, confidence }) => {
    dispatch(addIdea({ id, content, impact, ease, confidence }));
  };

  return (
    <Root hasIdeas={hasIdeas}>
      <PageHeader title="My Ideas" Action={() => <AddIdea onClick={handleAddIdeaClick} />} />
      {!hasIdeas && !isFetchingIdeas && (
        <HasIdeasWrap>
          <img src="/bulb.png" alt="Ideas" />
          <div>Got Ideas?</div>
        </HasIdeasWrap>
      )}
      <IdeaHeader />
      {ideas.map(idea => {
        const { id, ease, impact, confidence, average_score: average, content, mode } = idea;
        return (
          <Idea
            key={id}
            id={id}
            ease={ease}
            impact={impact}
            confidence={confidence}
            content={content}
            average={average}
            mode={mode}
            onDelete={handleDeleteClick}
            onAddCancel={handleAddIdeaCancelClick}
            onAddConfirm={handleAddIdeaConfirmClick}
            onEdit={handleEditConfirmClick}
            isDeleteIdeaModalActiveNow={isDeleteIdeaModalActiveNow}
            activeModalOptions={activeModalOptions}
          />
        );
      })}
    </Root>
  );
};
