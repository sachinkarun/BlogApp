import React,{ useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const LikePost = (postId) => {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        totalLikes()
    }, [])

    const likePost = () => {
        firestore()
            .collection("UsersBlogApp")
            .doc("Posts")
            .collection("UserPosts")
            .doc(postId.data)
            .collection("Likes")
            .doc(auth().currentUser.uid)
            .set({})
            .then(()=>{
                setLikes(likes + 1)
            })
    }

    const totalLikes = () => {
        firestore()
            .collection("UsersBlogApp")
            .doc("Posts")
            .collection("UserPosts")
            .doc(postId.data)
            .collection("Likes")
            .get()
            .then((snaps) => {
                setLikes(snaps.docs.length)
            })
    }

    /* const commentPost = (postId, comment, name) => {
        var d=new Date();
        firestore()
            .collection("UsersBlogApp")
            .doc("Posts")
            .collection("UserPosts")
            .doc(postId)
            .collection("Comments")
            .doc(auth().currentUser.uid)
            .set({
                comment: comment,
                username: name,
                time:d.getTime()
            })
    } */

    return (
        <>
            <Text style={styles.likeCount}>{likes} Likes</Text>

            <View style={styles.divider}></View>  

            <View style={{flexDirection:'row', width:"85%", marginBottom:30}}>

                <TouchableOpacity onPress={() => likePost()} style={styles.like}>
                    <Icon name="heart-outline" color="black" size={30} />
                    <Text style={{marginLeft:5, fontWeight:'bold'}}>Like</Text>
                </TouchableOpacity>

                <View style={styles.comment}>
                    <Icon name="chatbubble-outline" color="black" size={28} />
                    <Text style={{marginLeft:5, fontWeight:'bold'}}>Comment</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    likeCount: {
        fontWeight:'bold', marginLeft:-245, marginBottom:15
    },

    like: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#d9d9d9',
        width:100,
        paddingHorizontal:10,
        borderRadius:10
    },

    comment: {
        flexDirection:'row',
        alignItems:'center',
        marginLeft:15
    },

    divider: {
        width:"88%",
        height:1.5,
        backgroundColor:'#bfbfbf',
        marginBottom:20
    }
})

export default LikePost
