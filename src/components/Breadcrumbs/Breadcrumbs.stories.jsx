import React from 'react';

import { Breadcrumbs, Breadcrumb, BreadcrumbLink } from './Breadcrumbs';
import { Skeleton } from '../Loading';

export default {
  title: 'components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    componentSubtitle:
      'Display a list of items (links) that represent a hierarchy, to help the user "find their place" in the app.'
  }
};

export const DefaultBreadcrumbs = () => {
  const names = ['Standups', 'Daily updates', 'New update'];

  return (
    <Breadcrumbs>
      {names.map(name => {
        return (
          <Breadcrumb key={name} title={name}>
            {name}
          </Breadcrumb>
        );
      })}
    </Breadcrumbs>
  );
};

DefaultBreadcrumbs.story = {
  name: 'default'
};

export const CustomSeparatorBreadcrumbs = () => {
  const names = ['Standups', 'Daily updates', 'New update'];

  return (
    <Breadcrumbs separator=">">
      {names.map(name => {
        return (
          <Breadcrumb key={name} title={name}>
            {name}
          </Breadcrumb>
        );
      })}
    </Breadcrumbs>
  );
};

CustomSeparatorBreadcrumbs.story = {
  name: 'custom separator'
};

export const LongNameBreadcrumbs = () => {
  const names = [
    'When the breadcrumbs become too long',
    'They will automatically be truncated',
    'Based on the available screen size that is left',
    'Resize your screen to see it'
  ];

  return (
    <Breadcrumbs>
      {names.map(name => {
        return (
          <Breadcrumb key={name} title={name}>
            {name}
          </Breadcrumb>
        );
      })}
    </Breadcrumbs>
  );
};

LongNameBreadcrumbs.story = {
  name: 'long names'
};

export const LinkBreadcrumbs = () => {
  return (
    <Breadcrumbs>
      <Breadcrumb>Standups</Breadcrumb>

      <Breadcrumb>
        <BreadcrumbLink to="/">Daily updates</BreadcrumbLink>
      </Breadcrumb>

      <Breadcrumb>New update</Breadcrumb>
    </Breadcrumbs>
  );
};

LinkBreadcrumbs.story = {
  name: 'link'
};

export const LoadingBreadcrumbs = () => {
  return (
    <Breadcrumbs>
      <Breadcrumb>Standups</Breadcrumb>

      <Skeleton as={Breadcrumb}>Loading standup</Skeleton>
    </Breadcrumbs>
  );
};

LoadingBreadcrumbs.story = {
  name: 'loading'
};
