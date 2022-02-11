import React, {useState} from 'react';
import {Avatar, Text} from 'react-native-elements';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../styling/colors';
import api from '../utils/api';

const PluralUsersText = ({count}) => {
  const text = `${count > 1 ? 'users' : 'user'} `;
  return (
    <Text h4 style={styles.linkText}>
      {text}
    </Text>
  );
};

const LikerPopup = ({likes}) => {
  const [show, setShow] = useState(false);
  if (likes.length === 0) return <Text h4>users </Text>;

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(!show)}>
        <PluralUsersText count={likes.length} />
      </TouchableOpacity>
      {show && (
        <View style={styles.popup}>
          {likes.map((item) => (
            <View key={item.user_id} style={styles.userPanel}>
              <Avatar
                source={{uri: api.routes.upload(item.avatar)}}
                rounded
                size={40}
              />
              <Text h4> {item.username} </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    zIndex: 1,
    position: 'absolute',
    bottom: 55,
    left: -20,
    backgroundColor: colors.accent,
    minWidth: 300,
    padding: 10,
    paddingBottom: 0,
    borderRadius: 5,
  },
  linkText: {
    color: colors.accent,
  },
  popupText: {
    color: colors.light,
  },
  userPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    padding: 5,
    marginBottom: 10,
    borderRadius: 3,
  },
});

export default LikerPopup;
