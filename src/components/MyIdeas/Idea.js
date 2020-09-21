import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';
import PropTypes from 'prop-types';
import { ScoreInput } from './ScoreInput';
import { TitleInput } from './TitleInput';
import { EDIT, READ_ONLY } from '../../app/constants/idea';

const Root = styled('div')`
  border-bottom: 1px solid ${brandColors.border};
  margin-bottom: 1em;
  display: flex;
`;

const Score = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75em;
  font-size: 0.875em;
  align-items: center;
  min-height: 2.25em;
`;

const ScoreValue = styled('div')`
  color: ${brandColors.mediumGrey};
  width: 4em;
  padding: 0 0.5em;
  line-height: 2.25em;
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
  min-height: 2.25em;
  display: flex;
  align-items: center;
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
  padding-top: 1em;
`;

const ActionButton = styled('button')`
  border: 1px solid transparent;
  width: 1.75em;
  height: 1.75em;
  padding: 0.25em;
  margin-bottom: 1em;
  &:focus {
    border-color: ${brandColors.green};
  }
`;

export const Idea = ({
  id,
  content,
  impact,
  ease,
  confidence,
  average,
  onDelete,
  onAddCancel,
  onAddConfirm,
  onEdit,
  mode: newIdeaMode
}) => {
  const [mode, setMode] = useState(READ_ONLY);
  const [impactInput, setImpactInput] = useState(impact);
  const [easeInput, setEaseInput] = useState(ease);
  const [confidenceInput, setConfidenceInput] = useState(confidence);
  const [titleInput, setTitleInput] = useState(content);
  const isNewIdea = newIdeaMode === EDIT;
  const isEditMode = mode === EDIT || isNewIdea;

  const handleDeleteClick = event => {
    event.preventDefault();
    onDelete(id);
  };

  const handleEditClick = event => {
    event.preventDefault();
    setMode(EDIT);
  };

  const handleConfirmClick = event => {
    event.preventDefault();
    if (isNewIdea) {
      onAddConfirm({
        id,
        impact: impactInput,
        ease: easeInput,
        confidence: confidenceInput,
        content: titleInput
      });
    } else {
      onEdit({
        id,
        impact: impactInput,
        ease: easeInput,
        confidence: confidenceInput,
        content: titleInput
      });
    }
    setMode(READ_ONLY);
  };

  const handleCancelClick = event => {
    event.preventDefault();
    setMode(READ_ONLY);
    if (isNewIdea) {
      onAddCancel(id);
    }
  };

  return (
    <Root>
      <IdeaContent>
        {isEditMode ? (
          <TitleInput value={titleInput} onChange={setTitleInput} />
        ) : (
          <IdeaTitle>{titleInput}</IdeaTitle>
        )}
        <ScoresWrap>
          <Score id={`impact-score-${id}`}>
            <ScoreTitle>Impact</ScoreTitle>
            {isEditMode ? (
              <ScoreInput value={impactInput} onChange={setImpactInput} />
            ) : (
              <ScoreValue>{impactInput}</ScoreValue>
            )}
          </Score>
          <Score id={`ease-score-${id}`}>
            <ScoreTitle>Ease</ScoreTitle>
            {isEditMode ? (
              <ScoreInput value={easeInput} onChange={setEaseInput} />
            ) : (
              <ScoreValue>{easeInput}</ScoreValue>
            )}
          </Score>
          <Score id={`confidence-score-${id}`}>
            <ScoreTitle>Confidence</ScoreTitle>
            {isEditMode ? (
              <ScoreInput value={confidenceInput} onChange={setConfidenceInput} />
            ) : (
              <ScoreValue>{confidenceInput}</ScoreValue>
            )}
          </Score>
          <Score id={`average-score-${id}`}>
            <ScoreTitle isAverage>Avg.</ScoreTitle>
            <ScoreValue isAverage id={`average-score-value-${id}`}>
              {parseInt(average, 10)}
            </ScoreValue>
          </Score>
        </ScoresWrap>
      </IdeaContent>
      <Actions>
        {isEditMode ? (
          <>
            <ActionButton
              id={`confirm-edit-${id}`}
              key={`confirm-edit-${id}`}
              onClick={handleConfirmClick}
            >
              <img src="/confirm.png" alt="Confirm" />
            </ActionButton>
            <ActionButton
              id={`cancel-edit-${id}`}
              key={`cancel-edit-${id}`}
              onClick={handleCancelClick}
            >
              <img src="/cancel.png" alt="Cancel" />
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton
              id={`edit-button-${id}`}
              key={`edit-button-${id}`}
              onClick={handleEditClick}
            >
              <img src="/pen.png" alt="Edit" />
            </ActionButton>
            <ActionButton
              id={`delete-button-${id}`}
              key={`delete-button-${id}`}
              onClick={handleDeleteClick}
            >
              <img src="/bin.png" alt="Delete" />
            </ActionButton>
          </>
        )}
      </Actions>
    </Root>
  );
};

Idea.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  mode: PropTypes.string,
  impact: PropTypes.number.isRequired,
  ease: PropTypes.number.isRequired,
  confidence: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddConfirm: PropTypes.func.isRequired,
  onAddCancel: PropTypes.func.isRequired
};
