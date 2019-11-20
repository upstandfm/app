import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Outer = styled.div`
  position: relative;
  height: 2px;
  width: 100%;
  background-color: var(--color-lightest-purple);
  border-radius: var(--radius-size);
`;

const Inner = styled.div`
  background: ${props => {
    if (props.hasErr) {
      return 'var(--color-dark-red)';
    }

    if (props.isDone) {
      return 'var(--color-green)';
    }

    return 'var(--color-purple)';
  }};
  height: 100%;
  width: ${props => props.progress + '%'};
  transition: width 0.2s ease-in;
`;

Inner.propTypes = {
  hasErr: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired
};

export function ProgressBar({ err, progress }) {
  const hasErr = Boolean(err);
  const isDone = progress === 100;

  return (
    <Outer>
      <Inner hasErr={hasErr} isDone={isDone} progress={progress} />
    </Outer>
  );
}

ProgressBar.propTypes = {
  err: PropTypes.object,
  progress: PropTypes.number.isRequired
};

const StatusIcon = styled.span`
  margin: 0 0.25em 0 0;
  color: ${props => {
    switch (props.status) {
      case 'error': {
        return 'var(--color-dark-red)';
      }

      case 'uploading': {
        return 'var(--color-purple)';
      }

      case 'done': {
        return 'var(--color-green)';
      }

      default: {
        return 'var(--color-purple)';
      }
    }
  }};
`;

StatusIcon.propTypes = {
  status: PropTypes.oneOf(['error', 'uploading', 'done'])
};

export function UploadStatus({ err, progress }) {
  const hasErr = Boolean(err);
  const isDone = progress === 100;

  if (hasErr) {
    return (
      <>
        <StatusIcon status="error">
          <FontAwesomeIcon icon="exclamation-triangle" />
        </StatusIcon>

        <span>Upload failed</span>
      </>
    );
  }

  if (isDone) {
    return (
      <>
        <StatusIcon status="done">
          <FontAwesomeIcon icon="check" />
        </StatusIcon>

        <span>Upload complete</span>
      </>
    );
  }

  return (
    <>
      <StatusIcon status="uploading">
        <FontAwesomeIcon icon="circle-notch" spin />
      </StatusIcon>

      <span>Uploaded: {progress}%</span>
    </>
  );
}

UploadStatus.propTypes = {
  err: PropTypes.object,
  progress: PropTypes.number.isRequired
};
