import React from 'react';
import styled from 'styled-components';

import Dropdown, { DropdownSection, DropdownItem } from './Dropdown';

const Container = styled.div`
  position: relative;
  width: 280px;
  height: 220px;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
`;

const WrapperBottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const WrapperBottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Link = styled.span`
  display: block;
  padding: 4px 14px;

  :hover {
    background-color: var(--color-light-grey);
    cursor: pointer;
  }
`;

export default {
  title: 'components/Dropdown',
  component: Dropdown,
  parameters: {
    componentSubtitle: 'Dropdown components'
  }
};

export const DefaultDropdown = () => {
  return (
    <Container>
      <Wrapper>
        <Dropdown triggerEl="Click me!">
          <DropdownSection>
            <DropdownItem>
              <Link>Item 1</Link>
            </DropdownItem>

            <DropdownItem>
              <Link>Item 2</Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem>
              <Link>Item 3</Link>
            </DropdownItem>

            <DropdownItem>
              <Link>Item 4</Link>
            </DropdownItem>
          </DropdownSection>
        </Dropdown>
      </Wrapper>
    </Container>
  );
};

DefaultDropdown.story = {
  name: 'default'
};

export const DropdownUp = () => {
  return (
    <Container>
      <WrapperBottom>
        <Dropdown dropDirection="up" triggerEl={<span>Click me!</span>}>
          <DropdownSection>
            <DropdownItem>
              <Link>Item 1</Link>
            </DropdownItem>

            <DropdownItem>
              <Link>Item 2</Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem>
              <Link>Item 3</Link>
            </DropdownItem>

            <DropdownItem>
              <Link>Item 4</Link>
            </DropdownItem>
          </DropdownSection>
        </Dropdown>
      </WrapperBottom>
    </Container>
  );
};

DropdownUp.story = {
  name: 'drop "up"'
};

export const DropdownUpRight = () => {
  return (
    <Container>
      <WrapperBottomRight>
        <Dropdown
          dropDirection="up"
          alignSelf="right"
          triggerEl={<span>Click me!</span>}
        >
          <DropdownSection>
            <DropdownItem>
              <Link>Item 1</Link>
            </DropdownItem>

            <DropdownItem>
              <Link>Item 2</Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem>
              <Link>Item 3</Link>
            </DropdownItem>

            <DropdownItem>
              <Link>Item 4</Link>
            </DropdownItem>
          </DropdownSection>
        </Dropdown>
      </WrapperBottomRight>
    </Container>
  );
};

DropdownUpRight.story = {
  name: 'drop "up" + align "right"'
};
