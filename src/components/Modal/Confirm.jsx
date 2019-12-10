import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useOutsideClick from '../../hooks/use-outside-clicks';

import Button from '../Button';

import Modal from './Modal';
import { Main, Title, Footer } from './Layout';

export const ButtonWithSpace = styled(Button)`
  margin: 0 1.5em 0 0;

  @media (max-width: 470px) {
    margin: 0 0 1.5em 0;
  }
`;

/**
 * To comply with accessibility (a11y) keyboard navigation requirements, the
 * modal must behave as follows:
 *
 * 1. When the modal is open, focus is set to the cancel button.
 *
 * 2. When the modal is open, focus is "trapped" within the modal.
 *
 * 3. When the modal is open, pressing `Escape` closes it. Clicking "outside"
 *    the modal also closes it.
 *
 * 4. When the modal closes, focus returns to the trigger button.
 *
 *
 * Additionally, it meets the following requirements:
 *
 * - ✅ The modal has all relevant WAI-ARIA attributes in accordance with
 *   a11y guidelines.
 *
 * - ✅ When open, scrolling is "frozen" on the main document "behind" the modal.
 *
 * - ✅ When the modal is not open, it's _not_ rendered into the DOM.
 *
 * - ✅ When rendered, the modal is appended to the _end_ of then document body.
 *
 *
 * For more information see:
 *
 * - https://www.w3.org/TR/wai-aria-practices/#dialog_modal
 *
 * - https://assortment.io/posts/accessible-modal-component-react-portals-part-1
 *
 * - https://assortment.io/posts/accessible-modal-component-react-portals-part-2
 */
function Confirm({ show, handleCancel, handleConfirm, title, message }) {
  const cancelButton = React.createRef();

  const [modalEl] = useOutsideClick(handleCancel);

  React.useEffect(() => {
    const htmlEl = document.querySelector('html');
    const className = 'scroll-lock';

    if (show) {
      cancelButton.current.focus();
      htmlEl.classList.add(className);
    }

    return () => htmlEl.classList.remove(className);
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEscape = e => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Modal ref={modalEl} show={show} onKeyDown={handleEscape}>
      <Main
        role="alertdialog"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        <Title id="alert-title">{title}</Title>

        <p id="alert-message">{message}</p>
      </Main>

      <Footer>
        <ButtonWithSpace ref={cancelButton} tertiary onClick={handleCancel}>
          No, cancel
        </ButtonWithSpace>

        <Button tertiary onClick={handleConfirm}>
          Yes, I&apos;m sure
        </Button>
      </Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default Confirm;
