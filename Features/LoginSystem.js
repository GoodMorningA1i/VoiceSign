//Aarifa's Code

import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default class App extends React.Component {
  state={
    username: "",
    password: ""
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#6C0BB9', '#4B48D2', '#FFFFFF']}
          style={styles.background}/>

      <View style={styles.container}>
        <Text style={styles.logo}>S I G N</Text>

      </View>
        <View style={styles.image}>
          <Image
            style={styles.tinyLogo}
            source={require('../Images/avatar.png')}
          />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#FFFFFF"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#FFFFFF"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Don't have an account? Sign up.</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    // backgroundColor: "#6C0BB9",
    alignItems: 'center',
    justifyContent: 'center',
    height: 570,
    top:0
  },
  background: {
    position: 'absolute',
    left: 0,
    top:0,
    right: 0,
    height: '100%',
  },
  tinyLogo: {
    top:-40,
    width: 150,
    height: 150,
  },
  logo: {
    fontSize:48,
    color:"#FCCA18",
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
    color: "black",
    fontSize: 15
  },
  loginBtn: {
    width:"80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color: "black",
    fontSize: 16
  }
});