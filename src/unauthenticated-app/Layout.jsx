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

const _getBackgroundColor = props => {
  if (props.primary) {
    return props.theme.primaryBackgroundColor;
  }

  if (props.secondary) {
    return props.theme.secondaryBackgroundColor;
  }

  return '#ffffff';
};

const _getColor = props => {
  if (props.primary) {
    return props.theme.primaryForegroundColor;
  }

  if (props.secondary) {
    return props.theme.secondaryForegroundColor;
  }

  return props.theme.textColor;
};

export const Section = styled.section`
  display: ${props => (props.primary ? 'grid' : 'block')};
  position: relative;
  min-height: ${props => (props.primary ? '50vh' : 0)};
  margin: 0;
  padding: ${props => (props.primary ? '1em' : '2em 1em 4em 1em')};
  background-color: ${_getBackgroundColor};
  color: ${_getColor};
`;

export const Center = styled.div`
  margin: auto;
  text-align: center;
`;

export const CenterText = styled.div`
  text-align: center;
`;

export const Content = styled.div`
  max-width: 850px;
  margin: 0 auto;
`;

export const ContentHeader = styled.h2`
  margin: 2em 0 0.5em 0;
  font-size: ${props => (props.large ? '2em' : '1')};
  font-weight: normal;
  color: ${props => (props.large ? props.theme.brandColor : '#24b47e')};
`;
