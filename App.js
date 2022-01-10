import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {List} from './components/List';

const App = () => {
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <List />
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
