import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import Picture from './Image.js';
import Tabs from './Tabs.js';
import LoginSystem from './LoginSystem.js';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginSystem} />
        <Drawer.Screen name="Home" component={Tabs} />
        <Drawer.Screen name="Learning" component={Picture} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
