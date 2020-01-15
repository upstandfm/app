module.exports = {
  stories: ['../src/**/*.stories.(js|jsx|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs/preset',
    '@storybook/preset-create-react-app'
  ]
};
