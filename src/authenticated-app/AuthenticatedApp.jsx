import React from 'react';

import { useAuth0, useUser } from '../auth0';

import { Container, MenuBar, Brand, Actions, Profile, Main } from './Layout';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { fullName } = useUser();

  return (
    <Container>
      <MenuBar>
        <Brand>
          <h3>upstand.fm</h3>
        </Brand>

        <Actions>
          <span>New</span>
        </Actions>

        <Profile>
          <span>{fullName}</span>

          <button onClick={logout}>logout</button>
        </Profile>
      </MenuBar>

      <Main>
        <h1>Welcome</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi
          impedit, sed dignissimos asperiores earum possimus, ducimus quam vel
          quas ad esse ea fuga suscipit eius similique iusto labore! Qui?
        </p>
      </Main>
    </Container>
  );
}

export default AuthenticatedApp;
