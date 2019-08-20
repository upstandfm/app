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
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
  border-radius: 50%;

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
  font-size: 2.8em;
  color: var(--color-white);

  @media (max-width: 550px) {
    font-size: 2em;
  }
`;

export const BrandDescription = styled.h2`
  margin: 1em 0;
  padding: 0;
  font-size: 1.8em;
  font-weight: normal;
  color: var(--color-violet);

  @media (max-width: 550px) {
    font-size: 1.4em;
  }
`;
