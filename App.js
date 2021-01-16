// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import {DisplayAnImage} from './Image.js'

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Watcha doin.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50, // we don't need this, as our logo will be in the center?
    flex: 1,
    backgroundColor: '#A4508B',
    alignItems: 'center',
    justifyContent: 'center',
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
  inputText: {



  }
});

export default class App extends React.Component {
  state= {
    username: "",
    password: ""
  }
  render() {
    return (
      // this is where the logo picture will go?
      <View style={styles.logo}> 
        <Image
          style={styles.tinyLogo}
          source={require('./Images/Test.jpg')}
        />
        <View style={styles.inputView}>
          <TextInput
            style= {styles.inputText}
            placeholder= "Username..."
            placeholderTextColor= "#590799"
            onChangeText={text => this.setState({username:text})}/>
        </View>
        <View style={styles.inoutView}>
        <TextInput
          secureTextEntry
          style={styles.inoutText}
          placeholder="Password..."
          placeholderTextColor= "#590799"
          onChangeText={text => this.setState({password:text})}/>
        </View>
      </View>
    );
  }
}
