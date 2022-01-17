import React from 'react';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import {common} from './style/common';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <SafeAreaView style={[common.container, common.AndroidSafeArea]}>
      <Navigator />
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
