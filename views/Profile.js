import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {MainContext} from '../contexts/MainContex';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import api from '../utils/api';
import {Icon, Button, Avatar, Card, Text} from 'react-native-elements';

export const Profile = ({navigation}) => {
  const {setIsLoggedIn, user, token} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getAvatar} = useUser();

  useEffect(async () => {
    const files = await getAvatar(user.user_id, token);
    if (files.length) {
      setAvatar(api.ROUTES.upload(files[0].filename));
    }
  }, [user]);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <Card>
      <Card.Title>
        <Text h2>{user.username}</Text>
      </Card.Title>
      <Card.Divider>
        <View style={styles.header}>
          <Avatar rounded size={90} source={{uri: avatar}}></Avatar>
          <View style={{marginLeft: 15}}>
            <Text style={styles.text}>{user.full_name}</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
        </View>
      </Card.Divider>
      <Button title="Log out" onPress={logout}></Button>
    </Card>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
  },
});
