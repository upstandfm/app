import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  width: 235px;
  margin: 1em;
  padding: 0;
  border: 1px solid var(--color-lighter-coral);
  border-radius: var(--radius-size);

  @media (max-width: 770px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const LoadingContainer = styled(Container)`
  border-color: var(--color-light-grey);
  background-color: var(--color-white);

  :hover {
    cursor: wait;
  }
`;

const Wrapper = styled.div`
  display: grid;
  padding: 1em;
  height: 260px;
  background-color: var(--color-lighter-coral);
  transition: all 0.1s linear;
`;

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
  color: var(--color-darkest-purple);
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
  color: transparent;
  background-color: var(--color-light-grey);
  border-radius: var(--radius-size);
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
      <Wrapper>
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
    updatedAt: PropTypes.number.isRequired
  })
};

export default Info;
