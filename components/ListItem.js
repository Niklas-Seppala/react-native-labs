import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {image, container, text} from '../styles/styles';

/**
 * @param {{item:{title: string, thumbnails: {w160: string}, desc: string}}} param0
 * @return {object} List item component.
 */
export const ListItem = ({item}) => {
  return (
    <TouchableOpacity style={container.container}>
      <View style={styles.left}>
        <Image style={image.thumb} source={{uri: item.thumbnails.w160}} />
      </View>

      <View style={styles.right}>
        <Text style={[text.light, text.header]}>{item.title}</Text>
        <Text style={[styles.desc, text.dimmed]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnails: PropTypes.shape({
      w160: PropTypes.string.isRequired,
    }),
  }),
};

const styles = StyleSheet.create({
  right: {
    marginLeft: 16,
    flex: 1,
  },
  left: {
    flex: 1,
  },
  desc: {
    fontSize: 12,
  },
});
