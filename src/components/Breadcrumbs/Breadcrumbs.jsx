import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.nav`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
`;

const Separator = styled(ListItem)`
  color: var(--color-grey);
  margin: 0 0.5em;
`;

/**
 * To comply with accessibility (a11y) requirements, the breadcrumb
 * components meet the following requirements:
 *
 * - ✅ The breadcrumbs have all relevant WAI-ARIA attributes in accordance with
 *   a11y guidelines.
 *
 * For more info see:
 *
 * - https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb
 *
 * - https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html
 */
export const Breadcrumbs = ({ children, separator }) => {
  const childCount = React.Children.count(children);
  const items = React.Children.map(children, (child, i) => {
    if (!child) {
      return;
    }

    const isLast = i === childCount - 1;
    if (isLast) {
      return React.cloneElement(child, {
        'aria-current': 'page'
      });
    }

    return child;
  });

  const itemsWithSeparator = items.reduce((acc, el, i) => {
    acc.push(el);

    const isLastEl = i === items.length - 1;
    if (!isLastEl) {
      acc.push(
        <Separator key={`separator-${i}`} aria-hidden="true">
          {separator}
        </Separator>
      );
    }

    return acc;
  }, []);

  return (
    <Container aria-label="breadcrumb" data-testid="breadcrumbs">
      <List>{itemsWithSeparator}</List>
    </Container>
  );
};

Breadcrumbs.propTypes = {
  separator: PropTypes.string
};

Breadcrumbs.defaultProps = {
  separator: '/'
};

export const Breadcrumb = styled(ListItem)`
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-darkest-grey);
`;

export const BreadcrumbLink = styled(Link)`
  color: var(--color-light-purple);

  :active,
  :visited {
    color: var(--color-light-purple);
  }
`;
