import React,{ useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PostAuthor from './PostAuthor';
import Icon from 'react-native-vector-icons/Ionicons';

const AddPost = ({ navigation }) => {
    const [caption, setCaption] = useState("");
    const [username, setUsername] = useState("You");
    const [userId, setUserId] = useState(auth().currentUser.uid);

    useEffect(() => {
        getUser()
    })

    const getUser = () => {
        firestore()
        .collection("UsersBlogApp")
        .doc(userId)
        .get()
        .then((detail) => {
            setUsername(detail.data().name)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const createPost = () => {

        let d=new Date();
        let userPostId = "post-"+ d.getTime()
        firestore()
            .collection("UsersBlogApp")
            .doc("Posts")
            .collection("UserPosts")
            .doc(userPostId)
            .set({
                caption:caption,
                postId:userPostId,
                name: username,
                userId:userId,
                time:d.getTime()
            })
            .then(() => {
                Alert.alert("Posted")
                navigation.goBack()
            })
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.profilePic}>
                    <PostAuthor data={userId} />

                    <View style={styles.title}>

                        <View>
                            <Text style={styles.userName}>{username}</Text>
                            <Text style={{marginLeft:15}}>Now</Text>
                        </View>

                        <Icon name="ios-ellipsis-horizontal" color="black" size={30} />
                    </View>
                </View>

                <TextInput
                            style={[
                                styles.input,
                                {
                                    height:200,
                                    paddingVertical: 10,
                                    textAlignVertical: 'top'
                                }
                            ]}
                            multiline={true}
                            placeholder={'Type here!'}
                            value={caption}
                            onChangeText={(text) => setCaption(text)}
                        />

                <View style={styles.divider}></View>  

                <View style={{flexDirection:'row', width:"85%", marginBottom:30}}>

                    <View style={styles.like}>
                        <Icon name="heart-outline" color="black" size={30} />
                        <Text style={styles.txt}>Like</Text>
                    </View>

                    <View style={styles.comment}>
                        <Icon name="chatbubble-outline" color="black" size={28} />
                        <Text style={styles.txt}>Comment</Text>
                    </View>

                    <TouchableOpacity onPress={() => createPost()} style={styles.postBtn}>
                        <Text style={styles.txt2}>Post</Text>
                        <Icon name="send-sharp" color="black" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center'
    },

    card: {
        backgroundColor:"#f2f2f2",
        width:"90%",
        borderRadius:20,
        marginVertical:20,
        alignItems:'center'
    },

    input: {
        width: "93%",
        height:44,
        backgroundColor:"#fff",
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical:15,
    },

    profilePic: {
        flexDirection:"row",
        alignItems:'center',
        marginTop:20,
        paddingRight:10
    },

    title: {
        flexDirection:'row',
        width:260,
        justifyContent:'space-between'
    },

    userName: {
        fontWeight:'bold',
        fontSize:18,
        color:"black",
        marginLeft:10,
        paddingRight:10
    },

    divider: {
        width:"88%",
        height:1.5,
        backgroundColor:'#bfbfbf',
        marginVertical:20
    },

    like: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:8,
        borderRadius:10
    },

    comment: {
        flexDirection:'row',
        alignItems:'center',
        marginLeft:15
    },

    postBtn: {
        flexDirection:'row',
        alignItems:'center',
        marginLeft:15,
        backgroundColor:'#d9d9d9',
        width:100,
        paddingHorizontal:10,
        borderRadius:10
    },

    txt: {
        marginLeft:5,
        fontWeight:'bold'
    },
    txt2: {
        marginLeft:10,
        fontWeight:'bold',
        marginRight:10,
        paddingVertical:10
    }
})

export default AddPost;