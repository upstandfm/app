import React from 'react';
import PropTypes from 'prop-types';

import useOutsideClicks from '../../hooks/use-outside-clicks';

import { Container, Trigger, List } from './Layout';

/**
 * To comply with accessibility (a11y) keyboard navigation requirements, the
 * dropdown list must behave as follows:
 *
 * 1. When focusing on the dropdown button (trigger), pressing `Enter`,
 *    `Spacebar` or `Arrow Down` must open the dropdown (list).
 *
 * 2. When the dropdown opens, the first list item must get focus.
 *
 * 3. When pressing `Arrow Down` while a list item has focus, we must cycle
 *    through all list items (forwards).
 *
 * 4. When pressing `Arrow Up` while a list item has focus, we must cycle
 *    through all list items (backwards).
 *
 * 5. Pressing `Tab` while the list has focus, closes the dropdown and puts
 *    focus on the next element (i.e. _not_ the dropdown).
 *
 * 6. Pressing `Shift + Tab` while the list has focus, puts focus back on the
 *    dropdown button (trigger).
 *
 * 7. Pressing `Arrow Up` while the dropdown button (trigger) has focus, and
 *    the dropdown (list) is open, closes the dropdown (list).
 *
 * 8. When the dropdown (list) is open, pressing `Escape` closes it. Clicking
 *    "outside" the dropdown (list) also closes it.
 *
 *
 * Additionally, it meets the following requirements:
 *
 * - ✅ The dropdown has all relevant WAI-ARIA attributes in accordance with
 *   a11y guidelines.
 *
 * For more info see:
 *
 * - https://www.w3.org/TR/wai-aria-practices/#menubutton
 *
 * - https://inclusive-components.design/menus-menu-buttons/
 */
function Dropdown({
  dropDirection,
  alignSelf,
  width,
  refs,
  triggerEl,
  children
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState();
  const [focusIndex, setFocusIndex] = React.useState(-1);

  React.useEffect(() => {
    if (focusIndex < 0) {
      return;
    }

    const hasRef = refs[focusIndex];
    if (isOpen && hasRef) {
      refs[focusIndex].current.focus();
    }
  }, [isOpen, focusIndex, refs]);

  // Helpers

  const handleClose = () => {
    setIsOpen(false);
  };
  const [dropdownEl] = useOutsideClicks(handleClose);

  const resetFocusIndex = () => {
    setFocusIndex(-1);
  };

  // Event handlers

  const toggleList = () => {
    setIsOpen(s => !s);
  };

  const handleListKeyNav = e => {
    // "Tab" or "Shift + Tab" removes focus from list
    if (e.key === 'Tab' && isOpen) {
      setFocusIndex(-1);
      return;
    }

    // Pressing "Enter" or "Spacebar" when the dropdown (list) is closed,
    // focuses the first list item
    //
    // Note that we don't explicitly set state to open (i.e. "setIsOpen(true)"),
    // because the trigger is a "button" el, and that state is already set by
    // by "toggleList()" for "Enter" + "Spacebar" events natively
    //
    // We only have to focus the first list item
    if (e.key === 'Enter' || e.keyCode === 32) {
      if (!isOpen) {
        setFocusIndex(0);
        return;
      }
    }

    // "Arrow Down" is not supported natively by "button" el, so we have to
    // set state to open explicitly, in addition to also focusing the first
    // list item
    if (e.key === 'ArrowDown') {
      if (!isOpen) {
        setFocusIndex(0);
        setIsOpen(true);
        return;
      }

      // Cycle forwards
      setFocusIndex(i => {
        const newIndex = (i + 1) % refs.length;
        return newIndex;
      });
      return;
    }

    if (e.key === 'ArrowUp') {
      // If the dropdown is closed, we ignore "Arrow Up" events
      if (!isOpen) {
        return;
      }

      // When there's no focus, close the dropdown on "Arrow Up"
      // For example when shift tabbing from a focused list (to the trigger) and
      // then pressing "Arrow Up"
      if (focusIndex === -1) {
        setIsOpen(false);
        return;
      }

      // Cycle backwards
      setFocusIndex(i => {
        const _i = i < 0 ? 0 : i;
        const max = refs.length;
        const newIndex = (((_i - 1) % max) + max) % max;
        return newIndex;
      });
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
      resetFocusIndex();
    }
  };

  const handleBlur = () => {
    // Ignore blur events when a list item has focus
    if (focusIndex > -1) {
      return;
    }

    // Close the dropdown on the next tick by using setTimeout
    // This is needed because we first have to check if another child of the el
    // has received focus, as the blur event fires, BEFORE the new focus event
    const id = setTimeout(() => setIsOpen(false));
    setTimeoutId(id);

    resetFocusIndex();
  };

  // If a child el has focus, do NOT close the dropdown
  const handleFocus = () => {
    clearTimeout(timeoutId);
  };

  return (
    <Container
      ref={dropdownEl}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleListKeyNav}
    >
      <Trigger onClick={toggleList} aria-haspopup="true" aria-expanded={isOpen}>
        {triggerEl}
      </Trigger>

      <List
        width={width}
        isOpen={isOpen}
        dropDirection={dropDirection}
        alignSelf={alignSelf}
        role="menu"
      >
        {children}
      </List>
    </Container>
  );
}

Dropdown.propTypes = {
  dropDirection: PropTypes.oneOf(['up', 'down']),
  alignSelf: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.string,
  refs: PropTypes.array,
  triggerEl: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Dropdown.defaultProps = {
  width: '180px',
  refs: [],
  dropDirection: 'down',
  alignSelf: 'left'
};

export default Dropdown;
export { ListSection as DropdownSection } from './Layout';
export { ListItem as DropdownItem } from './Layout';
