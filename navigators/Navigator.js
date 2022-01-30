import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Single} from '../views/Single';
import {Profile} from '../views/Profile';
import {Home} from '../views/Home';

import Register from '../views/Register';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContex';
import { Upload } from '../views/Upload';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NAV_MAP = {
  Home: 'home',
  Profile: 'person',
  Upload: 'cloud-upload'
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({size, focused}) => (
          <Ionicons
            name={`${NAV_MAP[route.name]}${focused ? '' : '-outline'}`}
            size={size}
          ></Ionicons>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
      <Tab.Screen name='Upload' component={Upload}></Tab.Screen>
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
