import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './storyLoader';

import './rn-addons';

// import stories
configure(() => {
  loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage || null,
});

AppRegistry.registerComponent('democracyUI', () => StorybookUIRoot);

export default StorybookUIRoot;
