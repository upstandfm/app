import React from 'react';
import { render } from '@testing-library/react';

import { Breadcrumbs, Breadcrumb } from './Breadcrumbs';

describe('<Breadcrumbs />', () => {
  it('sets correct aria attrs', () => {
    const { getByTestId, getAllByText, getByText } = render(
      <Breadcrumbs>
        <Breadcrumb>Standups</Breadcrumb>
        <Breadcrumb>Upstand FM</Breadcrumb>
        <Breadcrumb>New update</Breadcrumb>
      </Breadcrumbs>
    );

    expect(getByTestId('breadcrumbs')).toHaveAttribute(
      'aria-label',
      'breadcrumb'
    );

    for (const separator of getAllByText('/')) {
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    }

    expect(getByText('New update')).toHaveAttribute('aria-current', 'page');
  });
});
