import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from './logo.svg';

const Img = styled.img`
  display: inline-block;
  margin: 0;
  padding: 0;
  max-width: ${props => (props.width ? '' : '300px')};
`;

/**
 * "Logo" defaults to a maximum width of 300px, but this can be
 * overridden:
 *
 *  <Logo width="512px" />
 */
function Logo({ width }) {
  return <Img src={logo} alt="logo" width={width} />;
}

Logo.propTypes = {
  width: PropTypes.string
};

export default Logo;
