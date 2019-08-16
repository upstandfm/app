import React from 'react';

/**
 * Custom hook to register outside clicks in a container.
 *
 * @param {Function} onOutsideClick - Callback to do something when an outside click happens
 *
 * @return {Array}
 */
function useOutsideClicks(onOutsideClick) {
  const el = React.useRef();

  const handleOutsideClicks = e => {
    const isInside = el.current.contains(e.target);
    if (isInside) {
      return;
    }

    onOutsideClick();
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClicks);

    return function cleanup() {
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [el];
}

export default useOutsideClicks;
