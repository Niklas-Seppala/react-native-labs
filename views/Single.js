import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContex';
import Media from '../components/Media';
import MediaLikes from '../components/MediaLikes';

export const Single = ({route: {params}}) => {
  const {item} = params;
  const [owner, setOwner] = useState(undefined);
  const {token} = useContext(MainContext);
  const {getUser} = useUser();

  useEffect(async () => {
    const user = await getUser(item.user_id, token);
    setOwner(user.username);
  }, []);

  return (
    <Card>
      <Card.Divider style={styles.header}>
        <Text h2>{item.title}</Text>
        {owner && <Text h4>{`By ${owner}`}</Text>}
      </Card.Divider>
      <Media item={item} />
      <Card.Divider style={{padding: 10}}>
        <MediaLikes item={item} />
      </Card.Divider>
      {Boolean(item.description) && <Text>{item.description}</Text>}
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  media: {
    aspectRatio: 1,
    width: '100%',
  },
  header: {
    paddingBottom: 15,
  },
});
