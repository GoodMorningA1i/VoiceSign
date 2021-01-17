import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactSVG } from 'react-svg'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 700,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={['rgba(75,72,210,1)', 'rgba(133,0,238,1)', 'rgba(255,255,255,0)']}
        style={styles.background}/>
      <Text>Hello</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={['rgba(75,72,210,1)', 'rgba(133,0,238,1)', 'rgba(255,255,255,0)']}
        style={styles.background}/>
      <Text>Settings</Text>
    </View>
  );
}

import AudioScreen from './Audio.js'

import CameraScreen from './Camera.js'
// function CameraScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Camera!!!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } 
            else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === 'Audio') {
              iconName = focused ? 'ios-headset' : 'ios-headset';
            }
            else if (route.name === 'Camera') {
              iconName = focused ? 'ios-camera' : 'ios-camera';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Audio" component={AudioScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
      </Tab.Navigator>
  );
}
