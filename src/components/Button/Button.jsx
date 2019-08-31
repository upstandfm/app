import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 0;
  padding: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 0.025em;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const _getBorder = props => {
  if (props.common) {
    return `1px solid ${props.theme.accentColor}`;
  }

  return 'none';
};

const _getBackgroundColor = props => {
  if (props.common) {
    return '#ffffff';
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

const Button = styled(StyledButton)`
  border: ${_getBorder};
  background-color: ${_getBackgroundColor};
  color: ${_getColor};
`;

Button.propTypes = {
  common: PropTypes.bool,
  danger: PropTypes.bool,
  invertTextColor: PropTypes.bool
};

/**
 * Primarily used in forms and user actions.
 */
export default Button;
