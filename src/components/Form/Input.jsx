import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Form = styled.form``;

export const Section = styled.div`
  margin: 1em 0;
`;

export const Label = styled.label`
  display: grid;
  grid-gap: 0.6rem;
  align-items: center;
  text-transform: none;
  font-weight: bold;
  letter-spacing: 0.035rem;
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
  padding: 0.6rem;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.25;
  border: 2px solid var(--color-grey);
  color: var(--color-darkest-grey);

  ::placeholder {
    font-weight: normal;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 1px 0 var(--color-light-purple);
    border-color: var(--color-light-purple);
  }

  :disabled {
    cursor: not-allowed;
    background-color: var(--color-white);
    text-decoration: line-through;
  }

  :invalid {
    box-shadow: 0 0 1px 0 var(--color-red);
    border-color: var(--color-red);
  }
`;

export const Description = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 0.8rem;
  font-style: italic;
  line-height: 1.5;
  color: ${props =>
    props.error ? 'var(--color-dark-red)' : 'var(--color-grey)'};
  height: 20px;
`;

Description.propTypes = {
  error: PropTypes.bool
};
