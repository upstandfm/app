import styled from 'styled-components';

export const RecordingList = styled.ul`
  margin: 0;
  padding: 1em 0;
  list-style: none;
`;

export const RecordingListItem = styled.li`
  display: grid;
  grid-template-columns: auto 4fr 1fr auto auto auto;
  grid-gap: 1em;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: all 0.1s linear;

  :nth-child(2n) {
    background-color: #fafafa;
  }

  :hover {
    background-color: var(--color-lighter-grey);
  }
`;

export const LoadingRecordingListItem = styled(RecordingListItem)`
  :hover {
    cursor: wait;
    background-color: transparent;

    :nth-child(2n) {
      background-color: #fafafa;
    }
  }
`;

const Text = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Name = styled(Text)``;

export const Meta = styled(Text)`
  color: var(--color-grey);
`;
