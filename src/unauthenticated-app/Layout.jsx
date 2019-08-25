import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
`;

export const Main = styled.main``;

export const Header = styled.header`
  padding: 2em;
  background-color: ${props => props.theme.primaryBackgroundColor};
  color: ${props => props.theme.primaryForegroundColor};
`;

export const Section = styled.section`
  display: grid;
  min-height: 45vh;
  margin: 0;
  padding: 1em;
  background-color: ${props =>
    props.secondary
      ? props.theme.secondaryBackgroundColor
      : props.theme.primaryBackgroundColor};
  color: ${props =>
    props.secondary
      ? props.theme.secondaryForegroundColor
      : props.theme.primaryForegroundColor};
`;

export const Center = styled.div`
  margin: auto;
  text-align: center;
`;

export const Content = styled.div`
  max-width: 850px;
  margin: 0 auto;
`;

export const ContentHeader = styled.h2`
  margin: 2em 0 0.5em 0;
`;
