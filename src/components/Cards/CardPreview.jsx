import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, WrapperLink, Title } from './Card';

const PreviewContainer = styled(Container).attrs(() => ({
  as: 'div'
}))`
  :hover {
    transform: none;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  }
`;

const Wrapper = styled(WrapperLink).attrs(() => ({
  as: 'div'
}))``;

function CardPreview({ title, bgImageUrl }) {
  return (
    <PreviewContainer>
      <Wrapper title={title} bg={bgImageUrl}>
        <Title>{title}</Title>
      </Wrapper>
    </PreviewContainer>
  );
}

CardPreview.propTypes = {
  title: PropTypes.string.isRequired,
  bgImageUrl: PropTypes.string
};

export default CardPreview;
