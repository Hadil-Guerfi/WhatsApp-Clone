

import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, StatusBar, ImageBackground, BackHandler } from 'react-native';
import firebase from '../config';
const auth = firebase.auth();

export default function Auth( props) {
    var email , pass ;
  const handlePress = () => {
    alert('Welcome to Expo!');
  };

  return (
    <ImageBackground source={require("../assets/1.png")}style={styles.container}>
      <View style={{backgroundColor:"#FFF5",
        height:300,
        width:"90%",
        alignItems:"center" ,
      }}
      >
      <Text style={{
       
        fontSize:32,
        fontWeight:"bold",
        
        
        }}
        >Welcome
        </Text>
<TextInput keyboardType='email-address' placeholder='email@email.site' onChangeText={(txt)=>{
    email=txt;
} }
style={styles.textinputstyle}/>
<TextInput  keyboardType='password' placeholder='password'  onChangeText={(txt)=> pass=txt} style={styles.textinputstyle
    
} 
></TextInput>  

<View style={{flexDirection:"row",gap:15}}>
  <Button title="submit" color='#98C9E1'  onPress={()=>{
    console.log(email);
    console.log(pass);
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        props.navigation.replace("Home", {
          currentid: auth.currentUser.uid,
        });
      })
      .catch((error) => alert(error));
}}></Button>

<Button  title='Exit' color='#98C9E1'  onPress={()=>{
  BackHandler.exitApp();
}}/>
</View>
<Text
onPress={()=>{ props.navigation.navigate("NewUser"); }}
style={{
  width:"100%",
  textAlign:"right",
  paddingRight:20,
  color:"black",
  fontWeight:"bold",
  fontStyle:'italic',

}} >Create new User
 </Text>

 </View>
 </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 20,
  },
  textinputstyle:{
    height:50,
    width:"90%",
    backgroundColor:"#98C9E1",
    marginBottom:10,
  },
});