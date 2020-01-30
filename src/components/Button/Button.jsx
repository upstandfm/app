import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RootButton = styled.button`
  font-family: 'Fira Sans', sans-serif;
  font-size: ${props => {
    switch (props.size) {
      case 'small': {
        return '13px';
      }

      default: {
        return '15px';
      }
    }
  }};
  font-weight: bold;
  text-decoration: none;
  text-transform: none;
  letter-spacing: 1px;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 8px 16px;
  border: 2px solid;
  border-radius: var(--radius-size);
  box-shadow: 0 4px 6px rgba(25, 18, 56, 0.14), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;

  :hover {
    cursor: pointer;
  }

  :disabled,
  :disabled:hover {
    cursor: not-allowed;
    color: var(--color-darkest-purple);
    background-color: var(--color-light-grey);
    border-color: var(--color-light-grey);
    box-shadow: none;
    text-decoration: line-through;
  }
`;

const PrimaryButton = styled(RootButton)`
  background-color: var(--color-darkest-purple);
  border-color: var(--color-darkest-purple);
  color: var(--color-white);

  :hover {
    background-color: var(--color-darker-purple);
    border-color: var(--color-darker-purple);
  }
`;

const SecondaryButton = styled(RootButton)`
  color: var(--color-darkest-purple);
  border-color: var(--color-darkest-purple);
  background-color: transparent;
  box-shadow: none;

  :hover {
    background-color: var(--color-darker-purple);
    border-color: var(--color-darker-purple);
    color: var(--color-white);
  }

  :disabled,
  :disabled:hover {
    border-color: var(--color-darkest-purple);
    color: var(--color-darkest-purple);
    background-color: transparent;
  }
`;

const TertiaryButton = styled(RootButton)`
  color: var(--color-darkest-purple);
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  padding: 4px 8px;

  :hover {
    background-color: var(--color-lightest-purple);
    border-color: var(--color-lightest-purple);
    color: var(--color-darkest-purple);
  }

  :disabled,
  :disabled:hover {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }
`;

const RoundButton = styled(RootButton)`
  padding: 0;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  box-shadow: none;
  border-color: var(--color-darkest-purple);
  background-color: var(--color-darkest-purple);
  color: var(--color-white);

  :hover {
    background-color: var(--color-darker-purple);
    border-color: var(--color-darker-purple);
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
  const { secondary, tertiary, round, ...restProps } = props;

  if (secondary) {
    return (
      <SecondaryButton ref={ref} {...restProps}>
        {props.children}
      </SecondaryButton>
    );
  }

  if (tertiary) {
    return (
      <TertiaryButton ref={ref} {...restProps}>
        {props.children}
      </TertiaryButton>
    );
  }

  if (round) {
    return (
      <RoundButton ref={ref} {...restProps}>
        {props.children}
      </RoundButton>
    );
  }

  return (
    <PrimaryButton ref={ref} {...restProps}>
      {props.children}
    </PrimaryButton>
  );
});

Button.propTypes = {
  size: PropTypes.oneOf(['small']),
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
