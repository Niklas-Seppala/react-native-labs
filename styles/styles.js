import {StyleSheet} from 'react-native';

export const container = StyleSheet.create({
  container: {
    backgroundColor: '#222c41',
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    flex: 1,
  },
});

export const image = StyleSheet.create({
  thumb: {
    borderBottomLeftRadius: 100,
    height: 180,
  },
  banner: {
    height: 180,
    borderBottomRightRadius: 100,
  },
});

export const text = StyleSheet.create({
  dimmed: {
    color: '#edeff28f',
  },
  light: {
    color: '#edeff2',
  },
  header: {
    fontSize: 18,
  },
});
