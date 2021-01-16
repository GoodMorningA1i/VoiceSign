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
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  state={
    username: "",
    password: ""
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>SIGN</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width:"80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height:50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width:"80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    heigth: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color: "white"
  }
});



//  inputView: {
//    width: "80%",
//    backgroundColor:
//    borderRadius:25;
//    height: 50,
//    marginBottom: 20,
//    justifyContent: "center",
//    padding: 20
//   }

// tinyLogo: {
  //   width: 50,
  //   height: 50,
  // },

  // logo: {
  //   paddingTop: 50,
  //   width: null,
  //   height: null,
  //   resizeMode: 'cover'
