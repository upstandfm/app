import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from './logo-with-name.svg';

const Img = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  max-width: ${props => props.width};
`;

function LogoWithName(props) {
  return (
    <Img
      {...props}
      src={logo}
      alt="logo with name upstand fm"
      width={props.width}
    />
  );
}

LogoWithName.propTypes = {
  width: PropTypes.string
};

LogoWithName.defaultProps = {
  width: '160px'
};

/**
 * Upstand FM logo with brand name.
 */
export default LogoWithName;
