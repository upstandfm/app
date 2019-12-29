import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';
import { ListItem } from '../components/List';

import { UploadRecordingName } from './Layout';
import { ProgressBar, UploadStatus } from './Progress';

import useUploadFile from './use-upload-file';

const UploadListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 0;
`;

const Wrapper = styled.div`
  display: grid;
  align-items: center;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0;
  align-items: center;
  margin: 0;
  color: var(--color-grey);
`;

const RetryButton = styled(Button)`
  padding: 0;
`;

export function PureUploadRecording({
  displayName,
  err,
  progress,
  handleRetry
}) {
  return (
    <UploadListItem>
      <UploadRecordingName title={displayName}>
        {displayName || 'Untitled'}
      </UploadRecordingName>

      <Wrapper>
        <ProgressBar err={err} progress={progress} />

        <Info>
          <UploadStatus err={err} progress={progress} />

          {Boolean(err) && (
            <RetryButton tertiary onClick={handleRetry}>
              retry
            </RetryButton>
          )}
        </Info>
      </Wrapper>
    </UploadListItem>
  );
}

PureUploadRecording.propTypes = {
  displayName: PropTypes.string,
  err: PropTypes.object,
  progress: PropTypes.number.isRequired,
  handleRetry: PropTypes.func.isRequired
};

function UploadRecording({ standupId, recording, onUploadedFile }) {
  const { id, blob, name } = recording;
  const displayName = name.trim();

  const [uploadFile, abortUploadFile, err, progress] = useUploadFile(
    standupId,
    id,
    onUploadedFile
  );

  const [, snackbarDispatch] = useSnackbar();

  const [retryId, setRetryId] = React.useState(0);

  React.useEffect(() => {
    const file = new File([blob], `${id}.webm`, {
      type: 'audio/webm'
    });
    const metadata = {
      name: displayName
    };
    uploadFile(file, metadata);

    return () => {
      abortUploadFile();
    };
  }, [retryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRetry = () => {
    setRetryId(id => id + 1);
  };

  React.useEffect(() => {
    if (!err) {
      return;
    }

    let text;
    if (err.details) {
      text = Array.isArray(err.details)
        ? `${err.message}: ${err.details.join(', ')}.`
        : err.details + '.';
    } else {
      text = err.message + '.';
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to upload recording',
        text
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PureUploadRecording
      displayName={displayName}
      err={err}
      progress={progress}
      handleRetry={handleRetry}
    />
  );
}

UploadRecording.propTypes = {
  standupId: PropTypes.string.isRequired,
  recording: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blob: PropTypes.object,
    name: PropTypes.string,
    isUploaded: PropTypes.bool.isRequired
  }),
  onUploadedFile: PropTypes.func.isRequired
};

export default UploadRecording;
