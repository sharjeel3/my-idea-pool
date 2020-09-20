import React from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';
import PropTypes from 'prop-types';

const Root = styled('div')`
  border-bottom: 1px solid ${brandColors.lightGrey};
  margin-bottom: 1em;
  display: flex;
`;

const Score = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75em;
  font-size: 0.875em;
`;

const ScoreValue = styled('div')`
  color: ${brandColors.mediumGrey};
  ${props =>
    props.isAverage &&
    `
    color: ${brandColors.grey};
  `}
`;

const ScoreTitle = styled('div')`
  color: ${brandColors.grey};
  ${props =>
    props.isAverage &&
    `
    font-weight: bold;
  `}
`;

const IdeaTitle = styled('div')`
  margin-bottom: 1em;
`;

const IdeaContent = styled('div')`
  flex-basis: 80%;
`;

const Actions = styled('div')`
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  align-items: center;
`;

const ScoresWrap = styled('div')`
  padding-right: 10%;
`;

const EditButton = styled('button')`
  border: 1px solid transparent;
  width: 1.75em;
  height: 1.75em;
  padding: 0.25em;
  margin-bottom: 1em;
  &:focus {
    border-color: ${brandColors.green};
  }
`;

const DeleteButton = styled(EditButton)``;

export const Idea = ({ id, content, impact, ease, confidence, average, onDelete }) => {
  const handleDeleteClick = event => {
    event.preventDefault();
    onDelete(id);
  };

  return (
    <Root>
      <IdeaContent>
        <IdeaTitle>{content}</IdeaTitle>
        <ScoresWrap>
          <Score id={`impact-score-${id}`}>
            <ScoreTitle>Impact</ScoreTitle>
            <ScoreValue>{impact}</ScoreValue>
          </Score>
          <Score id={`ease-score-${id}`}>
            <ScoreTitle>Ease</ScoreTitle>
            <ScoreValue>{ease}</ScoreValue>
          </Score>
          <Score id={`confidence-score-${id}`}>
            <ScoreTitle>Confidence</ScoreTitle>
            <ScoreValue>{confidence}</ScoreValue>
          </Score>
          <Score id={`average-score-${id}`}>
            <ScoreTitle isAverage>Avg.</ScoreTitle>
            <ScoreValue isAverage>{parseInt(average, 10)}</ScoreValue>
          </Score>
        </ScoresWrap>
      </IdeaContent>
      <Actions>
        <EditButton>
          <img src="/pen.png" alt="Edit" />
        </EditButton>
        <DeleteButton onClick={handleDeleteClick}>
          <img src="/bin.png" alt="Edit" />
        </DeleteButton>
      </Actions>
    </Root>
  );
};

Idea.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  impact: PropTypes.number.isRequired,
  ease: PropTypes.number.isRequired,
  confidence: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
};
