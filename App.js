import React from 'react';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContex';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';

import themes from './styling/themes';


const App = () => {
  return (
    <SafeAreaProvider>
      <MainProvider>
        <ThemeProvider theme={themes.light}>
          <Navigator />
        </ThemeProvider>
      </MainProvider>
    </SafeAreaProvider>
  );
};

export default App;
