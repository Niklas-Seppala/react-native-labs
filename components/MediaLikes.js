import React, {useContext, useEffect, useState} from 'react';
import {Text, Button} from 'react-native-elements';
import {View} from 'react-native';
import {useFavourites} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContex';
import colors from '../styling/colors';
import LikerPopup from './LikerPopup';

const MediaLikes = ({likes, item, style, onLikePressed}) => {
  const {postFavourite, deleteFavourite} = useFavourites();
  const {user, token} = useContext(MainContext);
  const [liked, setLiked] = useState(false);

  useEffect(async () => {
    setLiked(Boolean(likes?.find((fav) => fav.user_id === user.user_id)));
  }, [likes]);

  const toggleLike = async () => {
    const op = liked ? deleteFavourite : postFavourite;
    await op.call(this, item.file_id, token);
    setLiked(!liked);
    onLikePressed?.call(this);
  };

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <Text h4>{`${likes.length} `}</Text>
      <LikerPopup likes={likes} />
      <Text h4 style={{marginRight: 10}}>
        like this post
      </Text>
      <Button
        onPress={() => toggleLike().catch((err) => console.error(err))}
        icon={{name: liked ? 'thumb-down' : 'thumb-up', color: colors.light}}
        buttonStyle={{paddingHorizontal: 5, padding: 2}}
      />
    </View>
  );
};

export default MediaLikes;
