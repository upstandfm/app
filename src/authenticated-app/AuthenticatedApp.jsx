import React from 'react';

import { useAuth0, useUser } from '../auth0';

import Button from '../components/Button';
import AvatarDropdown from '../components/AvatarDropdown';

import { Container, MenuBar, Brand, Actions, Profile, Main } from './Layout';

function AuthenticatedApp() {
  const { logout } = useAuth0();
  const { avatarUrl, fullName, email } = useUser();

  return (
    <Container>
      <MenuBar>
        <Brand>
          <h3>upstand.fm</h3>
        </Brand>

        <Actions>
          <Button>new update</Button>
        </Actions>

        <Profile>
          <AvatarDropdown
            logout={logout}
            avatarUrl={avatarUrl}
            fullName={fullName}
            email={email}
          />
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
