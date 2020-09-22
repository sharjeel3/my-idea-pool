import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';
import PropTypes from 'prop-types';
import { ScoreInput } from './ScoreInput';
import { TitleInput } from './TitleInput';
import { EDIT, READ_ONLY } from '../../app/constants/idea';
import { media } from '../../ui-library/theme/media';

const Root = styled('div')`
  border-bottom: 1px solid ${brandColors.border};
  margin-bottom: 1em;
  display: flex;
  ${media.greaterThan('lg')`
    border-bottom: none;
  `}
`;

const Score = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75em;
  font-size: 0.875em;
  align-items: center;
  min-height: 2.25em;
  ${media.greaterThan('lg')`
    margin-bottom: 0;
  `}
`;

const ConfidenceScore = styled(Score)`
  ${media.greaterThan('lg')`
    width: 7em;
  `}
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
  ${media.greaterThan('lg')`
    display: none;
  `}
`;

const IdeaContent = styled('div')`
  flex-basis: 80%;
  ${media.greaterThan('lg')`
    flex-basis: 93%;
    display: flex;
    position: relative;
    padding-left: 1.5em;
    &:before {
      content: ' ';
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: ${brandColors.lightGrey};
    }
  `}
`;

const Actions = styled('div')`
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  align-items: center;
  ${media.greaterThan('lg')`
    flex-basis: 7%;
    flex-direction: row;
    opacity: 0;
    pointer-events: none;
    ${props =>
      props.isVisible &&
      `
      opacity: 1;
      pointer-events: all;
    `}
  `}
`;

const ScoresWrap = styled('div')`
  padding-right: 10%;
  padding-top: 1em;
  ${media.greaterThan('lg')`
    flex-basis: 35%;
    display: flex;
    padding: 0;
  `}
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
  ${media.greaterThan('lg')`
    margin: 0 0.3em;
  `}
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
  mode: newIdeaMode,
  isDeleteIdeaModalActiveNow,
  activeModalOptions
}) => {
  const [mode, setMode] = useState(READ_ONLY);
  const [impactInput, setImpactInput] = useState(impact);
  const [easeInput, setEaseInput] = useState(ease);
  const [confidenceInput, setConfidenceInput] = useState(confidence);
  const [titleInput, setTitleInput] = useState(content);
  const [isHovering, setIsHovering] = useState(false);
  const isNewIdea = newIdeaMode === EDIT;
  const isEditMode = mode === EDIT || isNewIdea;
  const isActionBarVisible =
    isHovering || isEditMode || (isDeleteIdeaModalActiveNow && activeModalOptions.id === id);

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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Root onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <IdeaContent>
        <TitleInput isEditMode={isEditMode} value={titleInput} onChange={setTitleInput} />
        <ScoresWrap>
          <Score id={`impact-score-${id}`}>
            <ScoreTitle>Impact</ScoreTitle>
            <ScoreInput isEditMode={isEditMode} value={impactInput} onChange={setImpactInput} />
          </Score>
          <Score id={`ease-score-${id}`}>
            <ScoreTitle>Ease</ScoreTitle>
            <ScoreInput isEditMode={isEditMode} value={easeInput} onChange={setEaseInput} />
          </Score>
          <ConfidenceScore id={`confidence-score-${id}`}>
            <ScoreTitle>Confidence</ScoreTitle>
            <ScoreInput
              isEditMode={isEditMode}
              value={confidenceInput}
              onChange={setConfidenceInput}
            />
          </ConfidenceScore>
          <Score id={`average-score-${id}`}>
            <ScoreTitle isAverage>Avg.</ScoreTitle>
            <ScoreValue isAverage id={`average-score-value-${id}`}>
              {parseInt(average, 10)}
            </ScoreValue>
          </Score>
        </ScoresWrap>
      </IdeaContent>
      <Actions isVisible={isActionBarVisible}>
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

Idea.defaultProps = {
  isDeleteIdeaModalActiveNow: false,
  activeModalOptions: {}
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
  isDeleteIdeaModalActiveNow: PropTypes.bool.isRequired,
  activeModalOptions: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  onAddCancel: PropTypes.func.isRequired
};
