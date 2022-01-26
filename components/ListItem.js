import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import api from '../utils/api';

import {
  ListItem as RNEListItem,
  Image,
  Text,
  Button,
} from 'react-native-elements';

export const ListItem = ({item, navigation}) => {
  return (
    <RNEListItem
      containerStyle={{padding: 5, borderRadius: 5}}
      style={{padding: 5}}
    >
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image
          containerStyle={styles.item}
          source={{uri: api.ROUTES.upload(item.thumbnails?.w320)}}
        ></Image>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{marginLeft: 10, alignSelf: 'flex-start'}}>
            <Text h4>{item.title}</Text>
            {item.description.length < 80 && <Text>{item.description}</Text>}
          </View>
          <Button
            containerStyle={{marginRight: 10}}
            onPress={() => navigation.navigate('Single', {item: item})}
            title="View"
          ></Button>
        </View>
      </View>
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
    width: 80,
  },
});
