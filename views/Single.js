import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import {Image, Card, Text} from 'react-native-elements';
import {ActivityIndicator, StyleSheet} from 'react-native';

export const Single = ({route: {params}}) => {
  const {item} = params;
  const imgSrc = {uri: api.ROUTES.upload(item.filename)};
  return (
    <Card>
      <Card.Divider style={styles.header}>
        <Text h2>{item.title}</Text>
        <Image
          containerStyle={styles.img}
          source={imgSrc}
          PlaceholderContent={<ActivityIndicator />}
        />
      </Card.Divider>
      <Text h4>{item.description}</Text>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  img: {
    aspectRatio: 1,
    width: '100%',
  },
  header: {
    paddingBottom: 15,
  },
});
