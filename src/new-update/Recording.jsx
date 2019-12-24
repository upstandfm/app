import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ListItem, ListItemText } from '../components/List';

export const Recording = styled(ListItem)`
  .play-state {
    color: ${props =>
      props.isSelected
        ? 'var(--color-light-purple)'
        : 'var(--color-light-grey)'};
  }

  :hover {
    cursor: pointer;

    .play-state {
      color: var(--color-light-purple);
    }
  }

  :focus {
    .play-state {
      color: var(--color-light-purple);
    }

    background-color: var(--color-lighter-grey);
  }
`;

Recording.propTypes = {
  isSelected: PropTypes.bool
};

const PlayStateContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 40px;
  height: 40px;
`;

export function PlayState({ isPlaying }) {
  return (
    <PlayStateContainer className="play-state">
      <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="lg" />
    </PlayStateContainer>
  );
}

PlayState.propTypes = {
  isPlaying: PropTypes.bool
};

export const Title = styled(ListItemText)`
  text-transform: capitalize;
  font-weight: normal;
  max-width: 240px;
`;

export const Actions = styled.div``;
