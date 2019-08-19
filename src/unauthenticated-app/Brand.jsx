import React from 'react';
import styled from 'styled-components';

import logo from './logo.svg';

export const BrandWrapper = styled.div`
  margin: auto;
  text-align: center;
`;

const Img = styled.img`
  display: inline-block;
  margin: 0;
  padding: 0;
  line-height: 1;
  vertical-align: middle;
  width: 64px;
  height: 64px;

  @media (max-width: 550px) {
    width: 40px;
    height: 40px;
  }
`;

export function Logo() {
  return <Img src={logo} alt="Logo" />;
}

export const BrandName = styled.h1`
  display: inline-block;
  margin: 0;
  padding: 0 0.2em;
  line-height: 1;
  vertical-align: middle;
  font-family: 'Nunito', sans-serif;
  font-size: 64px;
  color: var(--color-white);

  @media (max-width: 550px) {
    font-size: 40px;
  }
`;

export const BrandDescription = styled.h2`
  margin: 1em 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 550px) {
    font-size: 24px;
  }
`;
