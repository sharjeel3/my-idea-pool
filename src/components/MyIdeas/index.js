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
import { getMyIdeas } from '../../redux/selectors/ideas';
import { Idea } from './Idea';
import { showModal } from '../../redux/actions/modal';
import { DELETE_IDEA_MODAL } from '../../app/constants/modal';
import { PageHeader } from '../../ui-library/PageHeader';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

// Ideally API response should return total number of pages that we can use to paginate
const PAGE = 1;

const AddIdeaButton = styled('button')`
  width: 2em;
  height: 2em;
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

export const MyIdeas = () => {
  const dispatch = useDispatch();
  const ideas = useSelector(getMyIdeas);

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
    <Container>
      <PageHeader title="My Ideas" Action={() => <AddIdea onClick={handleAddIdeaClick} />} />
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
          />
        );
      })}
    </Container>
  );
};
