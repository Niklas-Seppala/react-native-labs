import React, {useContext} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {MainContext} from '../contexts/MainContex';
import {common} from '../style/common';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={[common.container, styles.container]}>
      <Button onPress={logout} title="Log Out"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};
