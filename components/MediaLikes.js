import React, {useContext, useEffect, useState} from 'react';
import {Text, Button} from 'react-native-elements';
import {View} from 'react-native';
import {useFavourites, useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContex';
import colors from '../styling/colors';
import LikerPopup from './LikerPopup';


const MediaLikes = ({item, style}) => {
  const {getUser} = useUser();
  const {getFavourites, postFavourite, deleteFavourite} = useFavourites();
  const {user, token} = useContext(MainContext);
  const [itemLikes, setItemLikes] = useState([]);
  const [liked, setLiked] = useState(null);

  useEffect(async () => {
    let res = await getFavourites(item.file_id);
    if (liked === null) {
      setLiked(Boolean(res.find((fav) => fav.user_id === user.user_id)));
    }
    const usersWhoLiked = res.map(
      async (item) => await getUser(item.user_id, token)
    );
    setItemLikes(await Promise.all(usersWhoLiked));
  }, [item, liked]);

  const toggleLike = async () => {
    const op = liked ? deleteFavourite : postFavourite;
    await op.call(this, item.file_id, token);
    setLiked(!liked);
  };

  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <Text h4>{`${itemLikes.length} `}</Text>
      <LikerPopup likes={itemLikes} />
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
