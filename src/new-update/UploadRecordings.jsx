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

const InfoText = styled.span`
  color: var(--color-grey);
`;

function UploadRecordings({ standupId, updatesByQuestionId, dispatch }) {
  return (
    <ListContainer>
      <List>
        {Object.keys(updatesByQuestionId).map(id => {
          const update = updatesByQuestionId[id];
          const hasRecording = Boolean(update.blob);

          return (
            <UploadListItem key={`upload-${update.id}`}>
              <UploadTitle>{update.id}</UploadTitle>

              <Wrapper>
                {hasRecording ? (
                  <UploadFile
                    key={`upload-${id}`}
                    standupId={standupId}
                    update={update}
                    dispatch={dispatch}
                  />
                ) : (
                  <InfoText>No recording.</InfoText>
                )}
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
  updatesByQuestionId: PropTypes.shape({
    yesterday: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object,
      isUploaded: PropTypes.bool.isRequired
    }),
    today: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object,
      isUploaded: PropTypes.bool.isRequired
    }),
    blockers: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object,
      isUploaded: PropTypes.bool.isRequired
    })
  }),
  dispatch: PropTypes.func.isRequired
};

export default UploadRecordings;
