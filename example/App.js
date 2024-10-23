import App from './src/App'
import Constants from 'expo-constants'

// Default to rendering your app
let AppEntryPoint = App

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig.extra.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default
}

export default AppEntryPoint
