import React,{ useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = () => {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getUser()
        setLoading(false);
    })

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image.path);

            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(image.path)
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) Alert.alert("Image Uploaded")
                },
                (error) => {
                    Alert.alert("Error")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setImage(downloadURL);
                        firestore()
                            .collection("UsersBlogApp")
                            .doc(auth().currentUser.uid)
                            .update({
                                img: downloadURL
                            })
                    })
                }
            )

        }).catch(err => {
              console.log(err);
          })
    }

    const signout = () => {
        auth().signOut()
    }

    const getUser = async () => {
        await firestore()
            .collection("UsersBlogApp")
            .doc(auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot._data.img){
                    setImage(snapshot._data.img)
                }
                const data = snapshot._data;
                setEmail(data.email);
                setUsername(data.name);
            })
    }

    if(loading){
        return(
            <View>
                <ActivityIndicator color="#4857fa" size="large" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4857fa" />
            <Image source={require('../../pint/img1.jpg')} style={{width:"100%", height:"35%"}} />

            {image.length > 0 ? (
                <View style={styles.background}>
                    <Image source={{uri: image}} style={styles.profilePic} />
                </View>
            ) : (
                <View style={styles.background}>
                    <Image source={require('../../pint/logo.png')} style={styles.profilePic} />
                </View>
            )}

                <View style={{marginTop:25, alignItems:'center'}}>
                    <Text style={styles.userName}>{username}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>

                <TouchableOpacity onPress={() => pickImage()} style={styles.pickImageBtn}>
                    <Text style={{color:"#fff", fontWeight:'bold', fontSize:18}}>Update Profile Picture</Text>
                </TouchableOpacity>

                <View style={styles.divider}></View>

                <TouchableOpacity onPress={() => signout()} style={styles.logoutBtn}>
                    <Text style={{color:"#fff", fontWeight:'bold', fontSize:20}}>Logout</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center'
    },
    profilePic: {
        width:213,
        height:213,
        borderRadius:110
    },
    background:{
        backgroundColor:"#fff",
        width:220,
        height:220,
        borderRadius:110,
        marginTop:-110,
        justifyContent:'center',
        alignItems:'center'
    },

    userName: {
        color:"black",
        fontWeight:'bold',
        fontSize:25
    },
    userEmail: {
        color:"black",
        fontWeight:'bold',
        fontSize:20
    },

    pickImageBtn: {
        width:"70%",
        height:60,
        backgroundColor:"#4857fa",
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:35
    },

    logoutBtn: {
        width:"50%",
        height:60,
        backgroundColor:"#4857fa",
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:35
    },

    divider: {
        width:"90%",
        height:1.5,
        backgroundColor:'#bfbfbf',
        marginTop:25
    }
})

export default Profile
