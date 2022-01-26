import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import {Image, Card, Text} from 'react-native-elements';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContex';

export const Single = ({route: {params}}) => {
  const {item} = params;
  const [owner, setOwner] = useState(undefined);
  const {getUser} = useUser();
  const {token} = useContext(MainContext);

  useEffect(async () => {
    const user = await getUser(item.user_id, token);
    setOwner(user);
  }, []);

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
      {Boolean(item.description) && <Text h4>{item.description}</Text>}
      {owner && <Text h4>{`By ${owner.username}`}</Text>}
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
