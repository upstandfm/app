import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.textColor};
`;

export const Main = styled.main``;

export const Header = styled.header`
  padding: 2em;
  background-color: ${props => props.theme.primaryColor};
`;

export const Section = styled.section`
  display: grid;
  min-height: 60vh;
  margin: 0;
  padding: 1em;
  background-color: ${props =>
    props.secondary ? props.primaryBackgroundColor : props.theme.primaryColor};
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
