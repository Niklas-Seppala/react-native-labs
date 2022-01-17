import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Single} from '../views/Single';
import {Profile} from '../views/Profile';
import {Home} from '../views/Home';

import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NAV_MAP = {
  Home: 'home',
  Profile: 'person',
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
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabScreen}
        options={{headerShown: false}}
      ></Stack.Screen>
      <Stack.Screen name="Single" component={Single}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen></StackScreen>
    </NavigationContainer>
  );
};

export default Navigator;