import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {List} from './components/List';

const App = () => {
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  AndroidSafeArea: {
    paddingTop: 25,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
