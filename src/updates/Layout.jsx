import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1em;
`;

export const DayDivider = styled.span`
  display: block;
  position: sticky;
  top: 1.5em;
  z-index: 1;
  margin: 1.5em 0;
  padding: 0;
  text-align: center;

  :after {
    background-color: var(--color-lightest-purple);
    color: var(--color-dark-purple);
    border-radius: 33px;
    padding: 0.3em 0.9em;
    font-size: 13px;

    /* The content value MUST be within quotes! */
    content: '${props => props.formattedDate}';
  }

  :hover {
    cursor: ${props => (props.showHelp ? 'help' : 'inherit')};
  }
`;

DayDivider.propTypes = {
  formattedDate: PropTypes.string.isRequired,
  showHelp: PropTypes.bool
};

export const LoadingDayDivider = styled(DayDivider)`
  :after {
    content: 'Today';
  }
`;

LoadingDayDivider.propTypes = {};

export const UpdatesContainer = styled.div``;
export const LoadMoreContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  margin: 0 0 2em 0;
`;
