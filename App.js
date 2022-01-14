import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  View,
  Text,
} from 'react-native';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import {List} from './components/List';
import {image, text} from './styles/styles';
import * as Icon from 'react-native-feather';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <AppHeader />
      <List />
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
};

const AppHeader = () => {
  return (
    <View style={styles.appHeader}>
      <Image
        style={image.banner}
        source={{uri: 'http://placekitten.com/620/620'}}
      ></Image>
      <View style={styles.appName}>
        <Text style={[text.header, text.light]}>HOMELESS KITTENS</Text>
      </View>
      <Icon.Menu
        stroke={'#edeff2'}
        style={[styles.menuIcon, {top: 8}]}
      ></Icon.Menu>
      <Icon.LogIn
        stroke={'#edeff2'}
        style={[styles.menuIcon, {top: 42}]}
      ></Icon.LogIn>
      <Icon.HelpCircle
        stroke={'#edeff2'}
        style={[styles.menuIcon, {top: 76}]}
      ></Icon.HelpCircle>
    </View>
  );
};

const styles = StyleSheet.create({
  appName: {
    backgroundColor: '#154da2cc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    padding: 10,
  },
  menuIcon: {
    position: 'absolute',
    right: 8,
  },
  appHeader: {
    position: 'relative',
    paddingBottom: 16,
  },
  appContainer: {
    backgroundColor: '#161f30',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
