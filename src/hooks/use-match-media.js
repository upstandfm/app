import React from 'react';

/**
 * Custom hook to match a media query.
 *
 * @return {Array}
 */
function useMatchMedia(query) {
  const [isMatch, setIsMatch] = React.useState(
    window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setIsMatch(mql.matches);

    if (mql.matches !== isMatch) {
      handler();
    }

    mql.addListener(handler);

    return () => mql.removeListener(handler);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return [isMatch];
}

export default useMatchMedia;
