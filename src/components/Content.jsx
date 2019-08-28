import styled from 'styled-components';

export const Content = styled.div`
  max-width: 850px;
  margin: 0 auto;
`;

export const ContentTitle = styled.h1`
  margin: 0;
  padding: 0.5em 0 0 0;
`;

export const ContentSubtitle = styled.h3`
  margin: 0;
  padding: 0.5em 0 0 0;
`;

export const ContentSection = styled.section`
  margin: 1.5em 0 0 0;
  padding: 1.5em;
  border-radius: 26px;
  background-color: #ffffff;
  color: ${props => props.theme.textColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;
