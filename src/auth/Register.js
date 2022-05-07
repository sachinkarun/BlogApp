import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:''
    });

    const signup = () => {

        const {name, email, password} = user
        if(name && password && email){
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firestore()
                    .collection("UsersBlogApp")
                    .doc(auth().currentUser.uid)
                    .set({
                        name:name,
                        email:email,
                        userid:auth().currentUser.uid
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }
    
                if (error.code === 'auth/invalid-email') {
                    Alert.alert("This email address is invalid!");
                }
    
                console.log(error);
            });
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#636ce3" />
            <Text style={{color:"#fff", fontWeight:'bold', fontSize:30, marginRight:180}}>Signup!</Text>
            <Text style={{color:"#fff", fontWeight:'bold', fontSize:12, marginRight:90, marginBottom:30}}>And get started with your first blog.</Text>

            <Image source={require('../../pint/img7.jpg')} style={{width:"100%", height:"30%"}} />

            <View style={styles.login}>

                    <View style={styles.input}>
                        <TextInput placeholder="Name" style={styles.text} value={user.name} onChangeText={(txt) => setUser({...user, name:txt})} />
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder="Email" style={styles.text} value={user.email} onChangeText={(txt) => setUser({...user, email:txt})} />
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder="Password" style={styles.text} value={user.password} onChangeText={(txt) => setUser({...user, password:txt})} />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => signup()}>
                        <Text style={{color:"#fff", fontWeight:'bold', fontSize:17}}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={{marginTop:25, flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold'}}>Already have an Account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{fontWeight:'bold', color:'#636ce3'}}>Signin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#636ce3',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:100
    },
    login: {
        marginTop:70,
        width:"100%",
        height:"60%",
        backgroundColor:"#fff",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        alignItems:'center',
        paddingTop:10
    },
    input: {
        width:"87%",
        height:45,
        marginTop:20,
        backgroundColor:"#fff",
        borderBottomWidth:1.5,
        borderBottomColor:"#737373"

        /* width:"87%",
        height:45,
        marginTop:20,
        borderRadius:7,
        backgroundColor:"#fff" */
    },
    text: {
        color:"black",
        paddingLeft:12
    },
    btn: {
        width:"87%",
        height:50,
        backgroundColor:"#636ce3",
        borderRadius:7,
        marginTop:30,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Register
