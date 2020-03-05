import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Badge = styled.span`
  justify-self: start;
  padding: 0.25em 0.5em;
  border-radius: var(--radius-size);
  border: 1px solid;
  background-color: ${props => {
    switch (props.status) {
      case 'error': {
        return 'var(--color-lightest-red)';
      }

      case 'accepted': {
        return 'var(--color-lightest-green)';
      }

      default: {
        return 'var(--color-lightest-purple)';
      }
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'error': {
        return 'var(--color-dark-red)';
      }

      case 'accepted': {
        return 'var(--color-dark-green)';
      }

      default: {
        return 'var(--color-dark-purple)';
      }
    }
  }};
  border-color: ${props => {
    switch (props.status) {
      case 'error': {
        return 'var(--color-lighter-red)';
      }

      case 'accepted': {
        return 'var(--color-lighter-green)';
      }

      default: {
        return 'var(--color-lighter-purple)';
      }
    }
  }};

  :hover {
    cursor: help;
  }
`;

export default function Status(props) {
  const titleByStatus = {
    pending: 'Waiting for user to accept the invite',
    accepted: 'User accepted the invite',
    error: 'Something went wrong and we failed to send the invite'
  };

  return <Badge {...props} title={titleByStatus[props.status]} />;
}

Status.propTypes = {
  status: PropTypes.oneOf(['pending', 'accepted', 'error'])
};
