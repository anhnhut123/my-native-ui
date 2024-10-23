module.exports = {
  stories: ['../stories/*.stories.mdx', '../stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
  framework: '@storybook/react-native',
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};
