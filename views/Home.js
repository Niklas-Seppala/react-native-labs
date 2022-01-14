import React from 'react';
import {SafeAreaView} from 'react-native';
import {styles} from '../style/common';
import {List} from '../components/List';

export const Home = () => {
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <List />
    </SafeAreaView>
  );
};
