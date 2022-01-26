import React from 'react';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContex';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
  return (
    <SafeAreaProvider>
      <MainProvider>
        <ThemeProvider>
          <Navigator />
        </ThemeProvider>
      </MainProvider>
    </SafeAreaProvider>
  );
};

export default App;
