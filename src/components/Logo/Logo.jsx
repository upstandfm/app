import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from './logo.svg';

const Img = styled.img`
  display: inline-block;
  margin: 0;
  padding: 0;
  max-width: ${props => props.width};
`;

function Logo(props) {
  return <Img {...props} src={logo} alt="logo" width={props.width} />;
}

Logo.propTypes = {
  width: PropTypes.string
};

Logo.defaultProps = {
  width: '48px'
};

/**
 * Upstand FM logo.
 */
export default Logo;
