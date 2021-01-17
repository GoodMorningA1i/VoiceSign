import Design from './Features/SideMenu.js'

export default function App() {
  return (
    Design()
  );
}

/* --------------- JUNK CODE - Past Versions --------------------

DEFAULT:
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {DisplayAnImage} from './Image.js'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Watcha doin.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

IMAGE:
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    paddingTop: 50,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.logo}>
        <Image
          style={styles.tinyLogo}
          source={require('./Images/Test.jpg')}
        />
      </View>
    );
  }
}
*/
