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
  background-color: var(--color-darkest-purple);
  display: grid;
  grid-template-areas:
    'nav'
    'standups';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
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

export const Nav = styled.nav`
  grid-area: nav;
`;

export const Main = styled.main`
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

export const MainContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 1em;
`;

export const Profile = styled.div`
  display: grid;
  justify-self: end;
`;
