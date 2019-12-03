import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 1em;
`;

export const DayDivider = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Day = styled.hr`
  height: 24px;
  margin: 0 0 2em 0;
  padding: 0;
  border: none;
  border-bottom: 1px solid var(--color-light-grey);
  overflow: visible;
  text-align: center;
  background-color: var(--color-lightest-grey);

  :after {
    position: relative;
    top: 13px;
    background-color: var(--color-lightest-grey);
    color: var(--color-darkest-purple);
    border-radius: 33px;
    padding: 0.25em 0.75em;

    /* The content value MUST be within quotes! */
    content: '${props => props.formattedDate}';
  }

  :hover {
    cursor: ${props => (props.showHelp ? 'help' : 'inherit')};
  }
`;

Day.propTypes = {
  formattedDate: PropTypes.string.isRequired,
  showHelp: PropTypes.bool
};

const Subtitle = styled.h4`
  display: inline-block;
  margin: 0;
  padding: 0.5em 1em;
  border-radius: var(--border-size);
  background-color: var(--color-lightest-purple);

  :hover {
    cursor: ${props => (props.showHelp ? 'help' : 'inherit')};
  }
`;

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

export const LoadingSubtitle = styled(Subtitle)`
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

export const UpdatesContainer = styled.div`
  margin: 0 0 2em 0;
`;
export const LoadMoreContainer = styled.div`
  display: grid;
  align-items: center;
  margin: 0 0 3em 0;
`;
