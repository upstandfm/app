import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, WrapperLink, Title } from './Card';

const PreviewContainer = styled(Container).attrs(() => ({
  as: 'div'
}))`
  :hover {
    box-shadow: 6px 6px 0 0 var(--color-darkest-purple);
  }
`;

const Wrapper = styled(WrapperLink).attrs(() => ({
  as: 'div'
}))`
  :hover {
    background-color: var(--color-lighter-coral);
  }
`;

function CardPreview({ title }) {
  return (
    <PreviewContainer>
      <Wrapper title={title}>
        <Title>{title}</Title>
      </Wrapper>
    </PreviewContainer>
  );
}

CardPreview.propTypes = {
  title: PropTypes.string.isRequired
};

export default CardPreview;
