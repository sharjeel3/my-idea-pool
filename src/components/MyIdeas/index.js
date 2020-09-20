import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../ui-library/Container';
import { fetchIdeas } from '../../redux/actions/ideas';
import { getMyIdeas } from '../../redux/selectors/ideas';
import { Idea } from './Idea';
import { showModal } from '../../redux/actions/modal';
import { DELETE_IDEA_MODAL } from '../../app/constants/modal';

// Ideally API response should return total number of pages that we can use to paginate
const PAGE = 1;

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

  return (
    <Container>
      <h2>My Ideas</h2>
      {ideas.map(idea => {
        const { id, ease, impact, confidence, average_score: average, content } = idea;
        return (
          <Idea
            key={id}
            id={id}
            ease={ease}
            impact={impact}
            confidence={confidence}
            content={content}
            average={average}
            onDelete={handleDeleteClick}
          />
        );
      })}
    </Container>
  );
};
