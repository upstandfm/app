import React from 'react';

/**
 * Custom hook that sets and interval.
 *
 * @param {Function} cb - Callback to execute on each interval (tick)
 * @param {Number} interval - Timing interval (i.e. delay) in ms.
 */
function useInterval(cb, interval) {
  const savedCb = React.useRef();

  React.useEffect(() => {
    savedCb.current = cb;
  });

  React.useEffect(() => {
    if (!interval) {
      return;
    }

    const tick = () => savedCb.current();
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
}

export default useInterval;
