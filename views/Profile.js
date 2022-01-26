import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Button, Text, Image, TouchableOpacity} from 'react-native';
import {MainContext} from '../contexts/MainContex';
import {common} from '../style/common';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import api from '../utils/api';
import { Ionicons } from '@expo/vector-icons';
import { borderColor, color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export const Profile = ({navigation}) => {
  const {setIsLoggedIn, user, token} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getAvatar} = useUser();

  useEffect(async () => {
    const files = await getAvatar(user.user_id, token);
    if (files.length) {
      setAvatar(api.ROUTES.upload(files[0].filename))
    }
  }, [user])

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <>
    <View style={styles.username}>
      <Ionicons name='person' size={20}></Ionicons>
      <Text style={styles.text}>{user.username}</Text>
    </View>
    <Image style={styles.avatar} source={{uri: avatar}}></Image>
    <Text style={[styles.text, {color: '#000', marginBottom: 5, fontSize: 18}]}>{user.full_name}</Text>
    <Text style={[styles.text, {color: '#000', marginBottom: 5, fontSize: 18}]}>{user.email}</Text>

    <View style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    flex: 3,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    color: '#2780d9',
    marginLeft: 10
  },
  username: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2780d9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
});

Profile.propTypes = {
  navigation: PropTypes.object,
};
