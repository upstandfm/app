import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from './logo.svg';

const Wrapper = styled.div`
  line-height: 1;
  text-align: center;

  @media (max-width: 550px) {
    text-align: left;
  }
`;

const Img = styled.img`
  display: inline-block;
  margin: 0 0.25em 0 0;
  padding: 0;
  line-height: 1;
  vertical-align: middle;
  width: ${props => props.width};
  height: ${props => props.height};

  @media (max-width: 550px) {
    display: none;
  }
`;

const Name = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 24px;
  line-height: 1;
  vertical-align: middle;
  color: ${props => props.theme.brandColor};
`;

function Logo({ width, height }) {
  return (
    <Wrapper>
      <Img src={logo} alt="Logo" width={width} height={height} />

      <Name>Upstand FM</Name>
    </Wrapper>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

Logo.defaultProps = {
  width: '24px',
  height: '24px'
};

export default Logo;
