import styled from 'styled-components';

const _getBackgroundColor = props => {
  if (props.secondary) {
    return props.theme.secondaryColor;
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
  width: 100%;
  margin: 0;
  padding: 18px;
  border-radius: 50px;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  background-color: ${_getBackgroundColor};
  color: ${_getColor};
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
