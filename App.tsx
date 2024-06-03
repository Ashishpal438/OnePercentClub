import React from 'react';
import 'react-native-gesture-handler';

import RootNavigation from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootNavigation />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
