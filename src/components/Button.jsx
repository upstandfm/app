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
  min-width: 180px;
  margin: 0;
  padding: 0.8em;
  border: ${_getBorder};
  border-radius: 50px;
  outline: none;
  box-sizing: border-box;
  font-size: 1em;
  font-weight: bold;
  text-transform: capitalize;
  background-color: ${_getBackgroundColor};
  color: ${_getColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
    transform: scale(1.04);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

export default Button;
