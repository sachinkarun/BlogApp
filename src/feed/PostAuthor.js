import React,{ useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PostAuthor = (data) => {
    const [picture, setPicture] = useState("");

    useEffect(() => {
        profilePic(data)
    },[])

    const profilePic = (uid) => {
        firestore()
            .collection("UsersBlogApp")
            .doc(uid.data)
            .get()
            .then((pictureSnap) => {
                console.log(pictureSnap.data())
                if(pictureSnap.data().img){
                    setPicture(pictureSnap.data().img)
                }
                else{
                    setPicture("")
                }
            })
    }

    return (
        <>
            {picture.length > 0 ? (
                <Image source={{uri: picture}} style={styles.profile} />
            ) : (
                <Image source={require('../../pint/logo.png')} style={styles.profile} />
            )}
        </>
    )
}
const styles = StyleSheet.create({
    profile:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:20
    }
})

export default PostAuthor;