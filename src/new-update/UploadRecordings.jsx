import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ListContainer, List, ListItem } from '../components/List';

import UploadFile from './UploadFile';

const UploadListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 0;
`;

const UploadTitle = styled.h4`
  margin: 0;
  text-transform: capitalize;
`;

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  height: 45px;
`;

function UploadRecordings({ standupId, updatesState, onUploadedFile }) {
  return (
    <ListContainer>
      <List>
        {Object.keys(updatesState).map(id => {
          const update = updatesState[id];

          return (
            <UploadListItem key={`upload-${update.id}`}>
              <UploadTitle>{update.id}</UploadTitle>

              <Wrapper>
                <UploadFile
                  key={`upload-${id}`}
                  standupId={standupId}
                  update={update}
                  onUploadedFile={onUploadedFile}
                />
              </Wrapper>
            </UploadListItem>
          );
        })}
      </List>
    </ListContainer>
  );
}

UploadRecordings.propTypes = {
  standupId: PropTypes.string.isRequired,
  updatesState: PropTypes.object.isRequired,
  onUploadedFile: PropTypes.func.isRequired
};

export default UploadRecordings;
