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
  padding: 8px 20px;
  border-radius: 33px;
  box-shadow: none;
  border: 2px solid;
  transition: all 0.2s ease;

  outline: 0;
  :focus {
    box-shadow: 0px 0px 0px 3px var(--color-light-mint);
  }

  :hover {
    cursor: pointer;
  }

  :disabled,
  :disabled:hover {
    cursor: not-allowed;
    color: var(--color-dark-grey) !important;
    background-color: var(--color-light-grey);
    border-color: var(--color-light-grey);
  }
`;

const DefaultButton = styled(RootButton)`
  background-color: var(--color-purple);
  color: var(--color-white) !important;
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
  color: var(--color-purple) !important;
  border-color: var(--color-purple);

  :hover {
    background-color: var(--color-purple);
    color: var(--color-white) !important;
  }

  :active {
    background-color: var(--color-dark-purple);
    border-color: var(--color-dark-purple);
  }
`;

const TertiaryButton = styled(RootButton)`
  background-color: transparent;
  color: var(--color-purple) !important;
  border-color: transparent;

  :hover {
    color: var(--color-light-purple) !important;
  }

  :active {
    color: var(--color-dark-purple) !important;
  }

  :disabled,
  :disabled:hover {
    color: var(--color-dark-grey) !important;
    background-color: transparent;
    border-color: transparent;
  }
`;

const RoundButton = styled(DefaultButton)`
  padding: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.2);
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
  const { secondary, tertiary, round } = props;

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

  if (round) {
    return (
      <RoundButton ref={ref} {...props}>
        {props.children}
      </RoundButton>
    );
  }

  return (
    <DefaultButton ref={ref} {...props}>
      {props.children}
    </DefaultButton>
  );
});

Button.propTypes = {
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Button;
