import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from './logo-with-name.svg';

const Img = styled.img`
  display: inline-block;
  margin: 0;
  padding: 0;
  max-width: ${props => (props.width ? '' : '180px')};
`;

/**
 * "LogoWithName" defaults to a maximum width of 180px, but this can be
 * overridden:
 *
 *  <LogoWithName width="512px" />
 */
function LogoWithName({ width }) {
  return <Img src={logo} alt="logo with name upstand fm" width={width} />;
}

LogoWithName.propTypes = {
  width: PropTypes.string
};

export default LogoWithName;
