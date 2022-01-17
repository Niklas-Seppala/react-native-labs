import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import api from '../utils/api';
import {common} from '../style/common';

/**
 * @param {{item:{title: string, filename: string, desc: string}}} param0
 * @return {object} List item component.
 */
export const ListItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Single', {item: item})}
      style={styles.container}
    >
      <View style={styles.left}>
        <Image
          style={styles.thumb}
          source={{uri: api.ROUTES.upload(item.thumbnails?.w320)}}
        />
      </View>

      <View style={styles.right}>
        <Text style={common.header_1}>{item.title}</Text>
        <Text style={common.text}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    filename: PropTypes.string,
    thumbnails: PropTypes.shape({
      w160: PropTypes.string,
      w320: PropTypes.string,
      w640: PropTypes.string,
    }),
  }),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d9dde0',
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    flex: 1,
  },
  right: {
    marginLeft: 16,
    flex: 1,
  },
  left: {
    flex: 1,
  },
  thumb: {
    height: 130,
  },
});
