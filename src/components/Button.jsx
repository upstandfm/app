import styled from 'styled-components';

const _getBorder = props => {
  if (props.secondary) {
    return `1px solid ${props.theme.accentColor}`;
  }

  return 'none';
};

const _getBackgroundColor = props => {
  if (props.special) {
    return props.theme.specialColor;
  }

  if (props.secondary) {
    return 'var(--color-white)';
  }

  if (props.danger) {
    return props.theme.dangerColor;
  }

  return props.theme.primaryColor;
};

const _getColor = props => {
  if (props.invertTextColor) {
    return props.theme.invertedTextColor;
  }

  return props.theme.textColor;
};

/**
 * Primary button:
 *  <Button>create</Button>
 *
 * Special button:
 *  <Button special>go do it!</Button>
 *
 * Secondary button:
 *  <Button secondary>create</Button>
 *
 * Danger button:
 *  <Button danger>delete</Button>
 *
 * Invert text color:
 *  <Button danger invertTextColor>delete</Button>
 */
const Button = styled.button`
  margin: 0;
  padding: 14px;
  border: ${_getBorder};
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: ${_getBackgroundColor};
  color: ${_getColor};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export default Button;
