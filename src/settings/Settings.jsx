import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import WorkspaceSettings from '../workspace-settings';
import WorkspaceMembers from '../workspace-members';

import { NotFound } from '../components/Errors';
import { Breadcrumbs, Breadcrumb } from '../components/Breadcrumbs';

import {
  Container,
  Header,
  NavContainer,
  Wrapper,
  Main,
  SideNav,
  Content
} from './Layout';

import { Menu, MenuLink } from './Menu';

export function PureSettings({ urlRouteMatch, children }) {
  return (
    <Container>
      <Header>
        <NavContainer>
          <Breadcrumbs>
            <Breadcrumb title="Settings">Settings</Breadcrumb>
          </Breadcrumbs>
        </NavContainer>
      </Header>

      <Wrapper>
        <Main>
          <SideNav>
            <Menu>
              <MenuLink exact to={urlRouteMatch}>
                Workspace
              </MenuLink>

              <MenuLink exact to={`${urlRouteMatch}/members`}>
                Members
              </MenuLink>

              <MenuLink exact to={`${urlRouteMatch}/account`}>
                Account
              </MenuLink>
            </Menu>
          </SideNav>

          <Content>{children}</Content>
        </Main>
      </Wrapper>
    </Container>
  );
}

PureSettings.propTypes = {
  urlRouteMatch: PropTypes.string
};

function Settings() {
  const { path, url } = useRouteMatch();

  return (
    <PureSettings urlRouteMatch={url}>
      <Switch>
        <Route exact path={path}>
          <WorkspaceSettings />
        </Route>

        <Route exact path={`${path}/members`}>
          <WorkspaceMembers />
        </Route>

        <Route exact path={`${path}/account`}>
          Account
        </Route>

        <Route path="*">
          <NotFound
            title="Page not found"
            info="Sorry! This page doesn't exist."
          />
        </Route>
      </Switch>
    </PureSettings>
  );
}

export default Settings;
