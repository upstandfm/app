import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RootButton = styled.button`
  font-family: 'Fira Sans', sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 1px;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 8px 20px;
  box-shadow: none;
  border: 2px solid;
  transition: all 0.1s linear;
  box-shadow: 6px 6px 0 0 var(--color-darkest-purple);
  color: var(--color-darkest-purple);

  :focus {
    outline: 3px solid var(--color-light-mint);
  }

  :hover {
    cursor: pointer;
  }

  :disabled,
  :disabled:hover {
    cursor: not-allowed;
    color: var(--color-dark-grey);
    background-color: var(--color-light-grey);
    box-shadow: 6px 6px 0 0 var(--color-darkest-purple);
    text-decoration: line-through;
  }
`;

const SpecialButton = styled(RootButton)`
  background-color: var(--color-light-coral);
  border-color: var(--color-darkest-purple);

  :hover {
    background-color: var(--color-lighter-coral);
    box-shadow: 8px 8px 0 0 var(--color-darkest-purple);
  }
`;

const PrimaryButton = styled(RootButton)`
  background-color: var(--color-lighter-purple);
  border-color: var(--color-darkest-purple);

  :hover {
    background-color: var(--color-lightest-purple);
    box-shadow: 8px 8px 0 0 var(--color-darkest-purple);
  }
`;

const SecondaryButton = styled(RootButton)`
  background-color: transparent;
  border-color: var(--color-darkest-purple);
  box-shadow: none;

  :hover {
    background-color: var(--color-lightest-grey);
  }

  :disabled,
  :disabled:hover {
    background-color: transparent;
    box-shadow: none;
  }
`;

const TertiaryButton = styled(RootButton)`
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;

  :hover {
    color: var(--color-purple);
  }

  :disabled,
  :disabled:hover {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }
`;

/**
 * You can pas any children and props like you would with "regular" buttons.
 *
 * Additionally, a button can be rendered as a different component using the
 * "as" prop. For example, to render a button as a router link, you can do:
 *
 * ```js
 * import { Link } from '@reach/router';
 *
 * <Button secondary as={Link} to="/">New Standup</Button>
 * ```
 *
 * For more info see:
 *
 * https://www.styled-components.com/docs/basics#extending-styles
 */
const Button = React.forwardRef((props, ref) => {
  const { special, secondary, tertiary } = props;

  if (special) {
    return (
      <SpecialButton ref={ref} {...props}>
        {props.children}
      </SpecialButton>
    );
  }

  if (secondary) {
    return (
      <SecondaryButton ref={ref} {...props}>
        {props.children}
      </SecondaryButton>
    );
  }

  if (tertiary) {
    return (
      <TertiaryButton ref={ref} {...props}>
        {props.children}
      </TertiaryButton>
    );
  }

  return (
    <PrimaryButton ref={ref} {...props}>
      {props.children}
    </PrimaryButton>
  );
});

Button.propTypes = {
  special: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Button;
