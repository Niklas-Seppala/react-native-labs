import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Counter} from './components/counter';
import {Header} from './components/header';

/**
 * Root Application
 * @return {App} App
 */
export default function App() {
  return (
    <View style={styles.container}>
      <Header title={'Cool Counter App'} />
      <Counter start={0} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
});
