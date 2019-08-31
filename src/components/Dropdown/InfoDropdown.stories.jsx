import React from 'react';
import styled from 'styled-components';

import InfoDropdown from './InfoDropdown';

const Footer = styled.div`
  position: relative;
  width: 280px;
  height: 480px;
`;

const Info = styled.div`
  position: absolute;
  left: 0;
`;

const InfoDown = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const InfoDownRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default {
  title: 'components|Dropdown/InfoDropdown',
  component: InfoDropdown,
  parameters: {
    componentSubtitle:
      'For showing extra information (like links and copyright)'
  }
};

export const DefaultInfoDropdown = () => {
  return (
    <Footer>
      <Info>
        <InfoDropdown />
      </Info>
    </Footer>
  );
};

DefaultInfoDropdown.story = {
  name: 'default'
};

export const UpInfoDropdown = () => {
  return (
    <Footer>
      <InfoDown>
        <InfoDropdown dropDirection="up" />
      </InfoDown>
    </Footer>
  );
};

UpInfoDropdown.story = {
  name: 'dropDirection "up"'
};

export const UpRightInfoDropdown = () => {
  return (
    <Footer>
      <InfoDownRight>
        <InfoDropdown dropDirection="up" alignSelf="right" />
      </InfoDownRight>
    </Footer>
  );
};

UpRightInfoDropdown.story = {
  name: 'dropDirection "up" + alignSelf "right"'
};
