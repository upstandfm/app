import PropTypes from 'prop-types';
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;

  @media (max-width: 980px) {
    display: block;
  }
`;

export const Sidebar = styled.div`
  width: 260px;
  height: 100%;
  margin: ${props => (props.show ? 0 : '0 0 0 -260px')};
  background-color: var(--color-white);
  border-right: 1px solid var(--color-light-grey);
  display: grid;
  grid-template-areas:
    'header'
    'nav'
    'standups'
    'actions';
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-gap: 1em;
  transition: all 0.1s ease;
  z-index: 1;

  @media (max-width: 980px) {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired
};

export const Header = styled.div`
  grid-area: header;
  margin: 1em 0;
  padding: 0 1em;
`;

export const Nav = styled.nav`
  grid-area: nav;
  margin: 1em 0;
`;

export const Actions = styled.div`
  margin: 2em 0;
  text-align: center;
`;

export const Main = styled.main`
  display: grid;
  position: relative;
  transition: all 0.1s ease;
  z-index: 0;

  @media (max-width: 980px) {
    transform: ${props =>
      props.sidebarIsOpen ? 'translate3d(260px, 0, 0)' : 'translate3d(0)'};
  }
`;

Main.propTypes = {
  sidebarIsOpen: PropTypes.bool.isRequired
};
