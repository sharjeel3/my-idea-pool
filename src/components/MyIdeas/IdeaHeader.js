import React from 'react';
import styled from 'styled-components/macro';
import { brandColors } from '../../ui-library/theme/colors';

import { media } from '../../ui-library/theme/media';

const Root = styled('div')`
  display: none;
  ${media.greaterThan('lg')`
    height: 2.25em;
    line-height: 2.25em;
    margin-bottom: 1em;
    display: flex;
  `}
`;

const Score = styled('div')`
  ${media.greaterThan('lg')`
    display: flex;
    justify-content: space-between;
    font-size: 0.875em;
    align-items: center;
    min-height: 2.25em;
    text-align: center;
  `}
`;

const ConfidenceScore = styled(Score)`
  width: 6.5em;
`;

const ScoreTitle = styled('div')`
  color: ${brandColors.grey};
  ${props =>
    props.isAverage &&
    `
    font-weight: bold;
  `}
  height: 2.25em;
  line-height: 2.25em;
  padding: 0 0;
  width: 4em;
  ${media.greaterThan('lg')`
    margin: 0 0.5em;
  `}
`;

const IdeaContent = styled('div')`
  flex-basis: 80%;
  ${media.greaterThan('lg')`
    flex-basis: 93%;
    display: flex;

  `}
`;

const ScoresWrap = styled('div')`
  padding-right: 10%;
  padding-top: 1em;
  ${media.greaterThan('lg')`
    flex-basis: 45%;
    display: flex;
    padding: 0;
  `}
`;

const Space = styled('div')`
  ${media.greaterThan('lg')`
    flex-basis: 52%;
  `}
  ${media.greaterThan('xlg')`
    flex-basis: 55%;
  `}
`;

export const IdeaHeader = () => {
  return (
    <Root>
      <IdeaContent>
        <Space />
        <ScoresWrap>
          <Score>
            <ScoreTitle>Impact</ScoreTitle>
          </Score>
          <Score>
            <ScoreTitle>Ease</ScoreTitle>
          </Score>
          <ConfidenceScore>
            <ScoreTitle>Confidence</ScoreTitle>
          </ConfidenceScore>
          <Score>
            <ScoreTitle isAverage>Avg.</ScoreTitle>
          </Score>
        </ScoresWrap>
      </IdeaContent>
    </Root>
  );
};
