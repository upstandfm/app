import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  color: ${props => props.theme.textColor};

  a {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};

    :visited {
      color: ${props => props.theme.primaryColor};
    }
  }

  p {
    line-height: 1.6;
  }
`;

export const Main = styled.main``;

export const Section = styled.section`
  display: grid;
  height: 75vh;
  margin: 0;
  padding: 1em;
  background-color: ${props =>
    props.secondary ? props.primaryBackgroundColor : props.theme.primaryColor};
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
