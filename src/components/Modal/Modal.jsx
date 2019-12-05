import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import styled from 'styled-components';

const Outer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

Outer.propTypes = {
  show: PropTypes.bool
};

const Inner = styled.div`
  position: fixed;
  background: var(--color-white);
  width: ${props => props.width};
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-grey);
  border-radius: var(--radius-size);

  :focus {
    outline: 0;
  }

  @media (max-width: 470px) {
    width: 75%;
  }
`;

/**
 * Pass a "ref" to deal with outside clicks, for example:
 *
 * ```
 * const modalEl = React.useRef();
 * <Modal ref={modalEl} />
 * ```
 */
const Modal = React.forwardRef((props, ref) => {
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <Outer data-testid="modal" onKeyDown={props.onKeyDown}>
        <Inner ref={ref} width={props.width} aria-modal="true" tabIndex="-1">
          {props.children}
        </Inner>
      </Outer>
    </FocusTrap>,
    document.body
  );
});

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  width: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Modal.defaultProps = {
  width: '450px;'
};

export default Modal;
