import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  justify-items: left;
  margin: 2em;

  @media (max-width: 770px) {
    justify-items: center;
  }
`;

export const Title = styled.h4`
  font-weight: normal;
  color: var(--color-grey);
  letter-spacing: 1px;
  margin: 0 0 0.5em 0;
`;
