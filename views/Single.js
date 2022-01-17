import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {common} from '../style/common';
import PropTypes from 'prop-types';
import api from '../utils/api';

export const Single = ({route: {params}}) => {
  const {item} = params;
  return (
    <View style={[common.container, styles.container]}>
      <Image
        style={styles.image}
        source={{uri: api.ROUTES.upload(item.filename)}}
      ></Image>
      <View style={styles.titleContainer}>
        <Text style={[common.header_1, styles.title]}>{item.title}</Text>
      </View>
    </View>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 0,
  },
  image: {
    height: 250,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#0e132b77',
    position: 'absolute',
    bottom: 0,
    padding: 8,
  },
  title: {
    color: '#fff',
  },
});
