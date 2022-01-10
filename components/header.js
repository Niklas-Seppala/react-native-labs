import { StyleSheet, Text, View } from 'react-native';
import { text, container } from '../styles/basestyles';

export const Header = ({title}) => {
  return (
    <View style={[styles.header, container.medium]}>
      <Text style={text.large}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#6797b2',
  }
});
