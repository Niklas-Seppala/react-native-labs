import {StyleSheet, StatusBar, Platform} from 'react-native';

export const common = StyleSheet.create({
  container: {
    flex: 1,
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header_1: {
    fontSize: 24,
  },
  text: {
    fontSize: 14,
  },
});
