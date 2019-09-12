import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Section = styled.div`
  margin: 1em 0;
`;

export const Label = styled.label`
  display: grid;
  grid-template-columns: ${props => (props.inline ? 'auto 1fr' : '1fr')};
  grid-gap: ${props => (props.inline ? '1rem' : '0.5rem')};
  align-items: center;
  text-transform: none;
  font-weight: bold;
  letter-spacing: 0.035em;
  line-height: 1.5;
  color: var(--color-grey);

  :hover {
    cursor: pointer;
  }
`;

Label.propTypes = {
  inline: PropTypes.bool
};

export const Input = styled.input`
  box-sizing: border-box;
  padding: 0.75rem;
  font-size: 17px;
  line-height: 1.25;
  border: 2px solid var(--color-light-grey);
  border-radius: 4px;
  color: var(--color-darkest-grey);

  :focus {
    box-shadow: 0 0 1px 0 var(--color-purple);
    border-color: var(--color-purple);
  }

  :disabled {
    cursor: not-allowed;
    background-color: var(--color-lighter-grey);
    color: var(--color-grey);
  }
`;

export const Description = styled.p`
  margin: 0.75rem 0 0 0;
  font-size: 0.9em;
  font-style: italic;
  line-height: 1.5;
  color: var(--color-grey);
`;
