import PropTypes from 'prop-types';
import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 35rem;
`;

export const Icon = styled.span`
  color: ${props => {
    switch (props.type) {
      case 'ok': {
        return 'var(--color-green)';
      }

      case 'warn': {
        return 'darkorange';
      }

      default: {
        return 'inherit';
      }
    }
  }};
`;

Icon.propTypes = {
  type: PropTypes.oneOf(['ok', 'warn'])
};

export const DangerText = styled.p`
  margin: 0 0 1em 0;
`;
