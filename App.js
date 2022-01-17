import React from 'react';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import {common} from './style/common';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContex';

const App = () => {
  return (
    <SafeAreaView style={[common.container, common.AndroidSafeArea]}>
      <MainProvider>
        <Navigator />
        <ExpoStatusBar style="auto" />
      </MainProvider>
    </SafeAreaView>
  );
};

export default App;
