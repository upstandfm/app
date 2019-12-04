import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1em;
`;

export const DayDivider = styled.hr`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 1em;
  margin: 0;
  padding: 0;
  border: none;
  border-bottom: 1px solid var(--color-light-grey);
  overflow: visible;
  text-align: center;
  background-color: var(--color-lightest-grey);

  :after {
    position: relative;
    top: 0.25em;
    background-color: var(--color-lightest-grey);
    color: var(--color-grey);
    border-radius: 33px;
    padding: 0.25em 0.75em;
    font-weight: bold;

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
  margin: 0 0 2em 0;
`;
