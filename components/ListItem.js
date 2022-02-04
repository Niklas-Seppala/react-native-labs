import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

import {ListItem as RNEListItem, Button, Avatar} from 'react-native-elements';

export const ListItem = ({item, navigation}) => {
  return (
    <RNEListItem bottomDivider>
      <Avatar
        avatarStyle={{borderRadius: 5}}
        size="large"
        rounded={false}
        source={{uri: api.routes.upload(item.thumbnails.w160)}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1}>{item.title}</RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {item.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button
        onPress={() => navigation.navigate('Single', {item: item})}
        title="View"
      />
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
