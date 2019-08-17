import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from './logo.svg';
import Img from './Img';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-gap: 0.3em;
  align-items: center;
  margin: 0 auto;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 26px;
  font-weight: 300;
  text-transform: uppercase;
`;

function Logo({ width, height }) {
  return (
    <Wrapper>
      <Img src={logo} alt="Logo" width={width} height={height} />

      <Name>upstand.fm</Name>
    </Wrapper>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

Logo.defaultProps = {
  width: '40px',
  height: '40px'
};

export default Logo;
