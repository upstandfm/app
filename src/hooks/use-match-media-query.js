import React from 'react';

/**
 * Custom hook to check if viewport matches a media query.
 *
 * @param {String} query - Media query, e.g. "max-width: 980px"
 *
 * @return {Array}
 */
function useMatchMediaQuery(query) {
  const isMatchMedia = q => window.matchMedia(`(${q})`).matches;

  const [hasMatch, setHasMatch] = React.useState(isMatchMedia(query));

  React.useEffect(() => {
    const handleResize = () => {
      setHasMatch(isMatchMedia(query));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [hasMatch];
}

export default useMatchMediaQuery;
