import React from 'react';
import {View} from 'react-native';
import {common} from '../style/common';
import {List} from '../components/List';
import PropTypes from 'prop-types';

export const Home = ({navigation}) => {
  return (
    <View style={common.container}>
      <List navigation={navigation} />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};
