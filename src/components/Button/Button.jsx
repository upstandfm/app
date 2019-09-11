import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RootButton = styled.button`
  font-family: 'Fira Sans', sans-serif;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 1px;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  line-height: 1.30775;
  padding: ${props => (props.round ? 0 : '8px 20px;')};
  border-radius: ${props => (props.round ? '50%' : '33px')};
  width: ${props => (props.round ? '48px' : 'auto')};
  height: ${props => (props.round ? '48px' : 'auto')};
  box-shadow: ${props =>
    props.round ? '0px 4px 6px 0px rgba(0, 0, 0, 0.2)' : 'none'};
  border: 2px solid;
  transition: all 0.2s ease;

  outline: 0;
  :focus {
    box-shadow: 0px 0px 0px 3px var(--color-light-coral);
  }

  :hover {
    cursor: pointer;
  }

  :disabled,
  :disabled:hover {
    cursor: not-allowed;
    color: var(--color-dark-grey);
    background-color: var(--color-light-grey);
    border-color: var(--color-light-grey);
  }
`;

const DefaultButton = styled(RootButton)`
  background-color: var(--color-purple);
  color: var(--color-white);
  border-color: var(--color-purple);

  :hover {
    background-color: var(--color-light-purple);
    border-color: var(--color-light-purple);
  }

  :active {
    background-color: var(--color-dark-purple);
    border-color: var(--color-dark-purple);
  }
`;

const SecondaryButton = styled(RootButton)`
  background-color: transparent;
  color: var(--color-purple);
  border-color: var(--color-purple);

  :hover {
    background-color: var(--color-purple);
    color: var(--color-white);
  }

  :active {
    background-color: var(--color-dark-purple);
    border-color: var(--color-dark-purple);
  }
`;

const SpecialButton = styled(RootButton)`
  background-color: var(--color-mint);
  color: var(--color-darkest-grey);
  border-color: var(--color-mint);

  :hover {
    background-color: var(--color-light-mint);
    border-color: var(--color-light-mint);
  }

  :active {
    background-color: var(--color-dark-mint);
    border-color: var(--color-dark-mint);
  }
`;

/**
 * You can pas any children and props like you would with "regular" buttons.
 */
function Button(props) {
  const { secondary, special } = props;

  if (secondary) {
    return <SecondaryButton {...props}>{props.children}</SecondaryButton>;
  }

  if (special) {
    return <SpecialButton {...props}>{props.children}</SpecialButton>;
  }

  return <DefaultButton {...props}>{props.children}</DefaultButton>;
}

Button.propTypes = {
  secondary: PropTypes.bool,
  special: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Button;
