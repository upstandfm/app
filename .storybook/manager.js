import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Upstand FM',
  brandUrl: 'https://www.upstand.fm'
});

addons.setConfig({
  panelPosition: 'bottom',
  theme
});
