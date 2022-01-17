import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {common} from '../style/common';

export const Profile = () => {
  return (
    <View style={[common.container, styles.container]}>
      <Text>PROFILE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
