import React, {useContext, useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {useUser, useFavourites} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContex';
import Media from '../components/Media';
import MediaLikes from '../components/MediaLikes';
import {ActivityIndicator} from 'react-native';
import colors from '../styling/colors';

const DelayedActivityIndicator = ({delay = 200, size = 50}) => {
  const [show, setShow] = useState(false);
  const componentMounted = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      componentMounted.current && setShow(true);
    }, delay);
    return () => componentMounted.current = false;
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {show && <ActivityIndicator size={size} color={colors.accent} />}
    </View>
  );
};

const getUsersWhoLiked = async (file, token) => {
  const {getFavourites} = useFavourites();
  const {getUser, getAvatar} = useUser();
  const res = await getFavourites(file.file_id);
  const usersWhoLiked = res.map(
    async (item) => {
      
      const [usr, avatar] = await Promise.all([getUser(item.user_id, token), getAvatar(item.user_id, token)]);
      return {...usr, avatar: avatar[0].filename};
    }
  );
  return await Promise.all(usersWhoLiked);
};

export const Single = ({route: {params}}) => {
  const {getUser} = useUser();
  const [owner, setOwner] = useState(undefined);
  const [itemLikes, setItemLikes] = useState([]);
  const {token} = useContext(MainContext);
  const {item} = params;
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    const [user, likes] = await Promise.all([
      getUser(item.user_id, token),
      getUsersWhoLiked(item, token),
    ]);

    console.log(likes);
    setItemLikes(likes);
    setOwner(user.username);
    setReady(true);
  }, []);

  if (!ready)
    return <DelayedActivityIndicator size={300} />

  return (
    <Card>
      <Card.Divider style={styles.header}>
        <Text h2>{item.title}</Text>
        {owner && <Text h4>{`By ${owner}`}</Text>}
      </Card.Divider>
      <Media item={item} />
      <Card.Divider style={{padding: 10}}>
        <MediaLikes
          likes={itemLikes}
          item={item}
          onLikePressed={async () =>
            setItemLikes(await getUsersWhoLiked(item, token))
          }
        />
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
