import styled from 'styled-components';

export const Main = styled.div`
  padding: 1.25em;
`;

export const Title = styled.h2`
  margin: 0 0 0.5em 0;
  font-weight: normal;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0em 0 0 0;
  background-color: var(--color-lightest-grey);
  border-radius: 0 0 var(--radius-size) var(--radius-size);
  padding: 1.25em;

  @media (max-width: 470px) {
    flex-direction: column;
  }
`;
