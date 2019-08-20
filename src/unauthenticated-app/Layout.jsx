import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.textColor};
`;

export const Main = styled.main``;

export const Section = styled.section`
  display: grid;
  min-height: 75vh;
  margin: 0;
  padding: 1em;
  background-color: ${props =>
    props.secondary ? props.primaryBackgroundColor : props.theme.primaryColor};
`;

export const Content = styled.div`
  max-width: 850px;
  margin: 0 auto;
`;

export const ContentHeader = styled.h2`
  margin: 2em 0 0.5em 0;
`;
