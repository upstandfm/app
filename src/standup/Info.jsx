import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  width: 235px;
  margin: 2em;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  @media (max-width: 770px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const LoadingContainer = styled(Container)`
  background-color: var(--color-lighter-grey);

  :hover {
    cursor: wait;
  }
`;

const Wrapper = styled.div`
  display: grid;
  padding: 1em;
  height: 260px;
  border-radius: 8px;
  background-color: var(--color-dark-purple);
  background-position: center center;
  background-size: cover;
  background-clip: border-box;
  background-repeat: repeat;
  background-image: ${props => `linear-gradient(
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 70%
    ),
    url(${props.bg})`};
`;

Wrapper.propTypes = {
  bg: PropTypes.string
};

const LoadingWrapper = styled.div`
  display: block;
  height: 260px;
  padding: 1em;
`;

const Title = styled.h2`
  margin: 0.25em 0;
  font-size: 26px;
  line-height: 1.2223;
  letter-spacing: 0.022em;
  color: var(--color-white);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
  word-break: break-word;
  overflow: auto;
`;

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

const LoadingTitle = styled(Title)`
  text-shadow: none;
  border-radius: 33px;
  color: transparent;
  background-color: var(--color-light-grey);
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--color-light-grey),
    var(--color-lighter-grey),
    var(--color-light-grey)
  );
  background-size: 100% 100%;
  animation: ${glimmer} 1s ease-in-out infinite;
`;

export function LoadingInfo() {
  return (
    <LoadingContainer>
      <LoadingWrapper>
        <LoadingTitle>A loading tite</LoadingTitle>
      </LoadingWrapper>
    </LoadingContainer>
  );
}

const Settings = styled.div`
  align-self: end;
  justify-self: end;
`;

const SettingsLink = styled(Link)`
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--color-light-grey) !important;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  :hover {
    color: var(--color-white) !important;
  }

  :active {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

function Info({ standup }) {
  return (
    <Container>
      <Wrapper bg={standup.standupImageUrl}>
        <Title>{standup.standupName}</Title>

        <Settings>
          <SettingsLink
            data-testid="link"
            to="settings"
            aria-label="settings"
            title="settings"
          >
            <FontAwesomeIcon icon="cog" size="lg" />
          </SettingsLink>
        </Settings>
      </Wrapper>
    </Container>
  );
}

Info.propTypes = {
  standup: PropTypes.shape({
    standupId: PropTypes.string.isRequired,
    standupName: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
    standupImageUrl: PropTypes.string
  })
};

export default Info;
