export default ({ config }) => ({
  ...config,
  name: 'Storybook native-uikit',
  slug: 'storybook-native-uikit',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
})
