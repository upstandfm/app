import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ListItem } from '../components/List';

export const Recording = styled(ListItem)`
  .play-state {
    color: ${props =>
      props.isSelected
        ? 'var(--color-light-purple)'
        : 'var(--color-light-grey)'};
  }

  :hover {
    cursor: ${props => {
      if (!props.isReady) {
        return 'not-allowed';
      }

      if (props.isDownloading) {
        return 'wait';
      }

      return 'pointer';
    }};

    .play-state {
      color: ${props => {
        if (props.isDownloading) {
          return 'var(--color-darkest-purple)';
        }

        return 'var(--color-light-purple)';
      }};
    }
  }

  :focus {
    .play-state {
      color: ${props => {
        if (props.isDownloading) {
          return 'var(--color-darkest-purple)';
        }

        return 'var(--color-light-purple)';
      }};
    }
  }
`;

Recording.propTypes = {
  isSelected: PropTypes.bool,
  isReady: PropTypes.bool,
  isDownloading: PropTypes.bool
};

Recording.defaultProps = {
  isSelected: false,
  isReady: false,
  isDownloading: false
};

const PlayStateContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 40px;
  height: 40px;
`;

export function PlayState({ isReady, isDownloading, isPlaying }) {
  if (!isReady) {
    return <PlayStateContainer className="play-state" />;
  }

  if (isDownloading) {
    return (
      <PlayStateContainer className="play-state">
        <FontAwesomeIcon icon="circle-notch" size="lg" spin />
      </PlayStateContainer>
    );
  }

  if (isPlaying) {
    return (
      <PlayStateContainer className="play-state">
        <FontAwesomeIcon icon="pause" size="lg" />
      </PlayStateContainer>
    );
  }

  return (
    <PlayStateContainer className="play-state">
      <FontAwesomeIcon icon="play" size="lg" />
    </PlayStateContainer>
  );
}

PlayState.propTypes = {
  isReady: PropTypes.bool,
  isDownloading: PropTypes.bool,
  isPlaying: PropTypes.bool
};

PlayState.defaultProps = {
  isReady: false,
  isDownloading: false,
  isPlaying: false
};

export const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
`;

export const Title = styled.h4`
  margin: 0;
  text-transform: capitalize;
  font-weight: normal;
`;

export const Status = styled.div`
  justify-self: center;
`;

export const Badge = styled.span`
  padding: 0.25em 0.5em;
  background-color: ${props =>
    props.status === 'error'
      ? 'var(--color-lightest-red)'
      : 'var(--color-lightest-purple)'};
  color: ${props =>
    props.status === 'error'
      ? 'var(--color-dark-red)'
      : 'var(--color-dark-purple)'};
  border-radius: var(--radius-size);
`;

Badge.propTypes = {
  status: PropTypes.oneOf(['transcoding', 'error', 'completed'])
};

export const Meta = styled.div`
  color: var(--color-grey);
`;
