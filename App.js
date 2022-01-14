import React from 'react';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {Home} from './views/Home';
import {View} from 'react-native';

const App = () => {
  return (
    <View>
      <Home></Home>
      <ExpoStatusBar style="auto" />
    </View>
  );
};

export default App;
