import {StyleSheet, StatusBar, Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
