import React from 'react';
import 'react-native-gesture-handler';

import RootNavigation from './src/navigation/RootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigation/>
    </GestureHandlerRootView>
  );
}

export default App;
