import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../styling/colors';

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
    <TouchableOpacity onPress={() => setShow(!show)}>
      <PluralUsersText count={likes.length} />
      {show && (
        <View style={styles.popup}>
          {likes.map((item) => (
            <Text h4 key={item.user_id} style={styles.popupText}>
              {item.username}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    bottom: 50,
    left: -20,
    backgroundColor: colors.accent,
    width: 250,
    padding: 10,
    borderRadius: 5,
  },
  linkText: {
    color: colors.accent,
  },
  popupText: {
    color: colors.light,
  },
});

export default LikerPopup;
