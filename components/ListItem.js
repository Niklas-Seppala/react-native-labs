import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import api from '../utils/api';

import {ListItem as RNEListItem, Card, Image, Text} from 'react-native-elements';

export const ListItem = ({item, navigation}) => {
  return (
    <RNEListItem onPress={() => navigation.navigate('Single', { item: item})}>
      <Card>
        <Card.Divider>
          <Text h3>{item.title}</Text>
        </Card.Divider>
        <Image
          containerStyle={styles.item}
          source={{uri: api.ROUTES.upload(item.thumbnails?.w320)}}
        ></Image>
      </Card>
    </RNEListItem>
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
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: 26,
  },
  desc: {
    fontSize: 18
  }
});
