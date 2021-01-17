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
    paddingTop: 300,
    width: 400,
    height: 400,
    flex: 2,
    alignItems: "center"
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.logo}>
        <Image
          style={styles.tinyLogo}
          source={require('../Images/moving_hand.gif')}
        />
      </View>
    );
  }
}