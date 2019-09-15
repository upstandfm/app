import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Form = styled.form``;

export const Section = styled.div`
  margin: 1em 0;
`;

export const Label = styled.label`
  display: grid;
  grid-gap: 1em;
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

export const InlineLabel = styled(Label)`
  grid-template-columns: auto 1fr;

  @media (max-width: 470px) {
    grid-template-columns: auto;
  }
`;

export const Input = styled.input`
  box-sizing: border-box;
  padding: 0.75rem;
  font-size: 17px;
  font-weight: bold;
  line-height: 1.25;
  border: 2px solid var(--color-light-grey);
  border-radius: 4px;
  color: var(--color-darkest-grey);

  ::placeholder {
    font-weight: normal;
    opacity: 0.4;
  }

  :focus {
    box-shadow: 0 0 1px 0 var(--color-purple);
    border-color: var(--color-purple);
  }

  :disabled {
    cursor: not-allowed;
    background-color: var(--color-lightest-grey);
    color: var(--color-grey);
  }

  :invalid {
    box-shadow: 0 0 1px 0 var(--color-red);
    border-color: var(--color-red);
  }
`;

export const Description = styled.p`
  margin: 0.75rem 0 0 0;
  font-size: 0.9em;
  font-style: italic;
  line-height: 1.5;
  color: ${props =>
    props.error ? 'var(--color-dark-red)' : 'var(--color-grey)'};
  height: 21px;
`;

Description.propTypes = {
  error: PropTypes.bool
};
