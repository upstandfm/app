import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';

import { ProgressBar, UploadStatus } from './Progress';

import useUploadFile from './use-upload-file';

const Text = styled.p`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.25em;
  align-items: center;
  margin: 0;
  color: var(--color-grey);
`;

function UploadRecording({ standupId, update, onUploadedFile }) {
  const [, snackbarDispatch] = useSnackbar();

  const [retryId, setRetryId] = React.useState(0);

  const [uploadFile, abortUploadFile, uploadProgress, err] = useUploadFile(
    standupId,
    update.id,
    onUploadedFile
  );

  React.useEffect(() => {
    const file = new File([update.blob], `${update.id}.webm`, {
      type: 'audio/webm'
    });
    uploadFile(file);

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
    <>
      <ProgressBar err={err} progress={uploadProgress} />

      <Text>
        <UploadStatus err={err} progress={uploadProgress} />

        {Boolean(err) && (
          <Button tertiary onClick={handleRetry}>
            retry
          </Button>
        )}
      </Text>
    </>
  );
}

UploadRecording.propTypes = {
  standupId: PropTypes.string.isRequired,
  update: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blob: PropTypes.object,
    isUploaded: PropTypes.bool.isRequired
  }),
  onUploadedFile: PropTypes.func.isRequired
};

export default UploadRecording;
