import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cards = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 1em;
`;

/**
 * You can pas <Card/> components as children.
 */
Cards.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Cards;
