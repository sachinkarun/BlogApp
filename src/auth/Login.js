import React,{ useState } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const login = () => {
        auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log("Logged in")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4857fa" />

            <Text style={{color:"#fff", fontWeight:'bold', fontSize:30, marginRight:200}}>Hello!</Text>
            <Text style={{color:"#fff", fontWeight:'bold', fontSize:26, marginRight:110}}>Welcome Back</Text>
            <View style={{width:"100%", height:"75%", alignItems:'center'}}>

                <Image source={require('../../pint/img1.jpg')} style={{width:"100%", height:"50%"}} />
                <View style={styles.login}>

                    <View style={styles.input}>
                        <TextInput placeholder="Email" style={styles.text} value={user.email} onChangeText={(txt) => setUser({...user, email:txt})} />
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder="Password" style={styles.text} value={user.password} onChangeText={(txt) => setUser({...user, password:txt})} />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => login()}>
                        <Text style={{color:"#fff", fontWeight:'bold', fontSize:20}}>Login</Text>
                    </TouchableOpacity>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold'}}>Don't have an Account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{fontWeight:'bold', color:'#0066ff'}}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#4857fa',
        // backgroundColor:'#f2f2f2',
        justifyContent:'center',
        alignItems:'center'
    },
    login: {
        marginTop:70,
        width:"100%",
        height:"50%",
        backgroundColor:"#fff",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        alignItems:'center',
        paddingTop:10
    },
    input: {
        /* width:"87%",
        height:45,
        marginTop:20,
        borderRadius:7,
        backgroundColor:"#fff",
        borderWidth:2,
        borderColor:"#d9d9d9", */
        width:"87%",
        height:45,
        marginTop:20,
        backgroundColor:"#fff",
        borderBottomWidth:1.5,
        borderBottomColor:"#737373"
    },
    text: {
        color:"black",
        paddingLeft:12
    },
    btn: {
        width:"87%",
        height:50,
        backgroundColor:"#0066ff",
        borderRadius:7,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Login