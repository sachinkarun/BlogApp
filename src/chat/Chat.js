import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet,StatusBar, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { otherUser, loggedInUser } = route.params;
    console.log(otherUser.img)

    useEffect(() => {

        const docid = loggedInUser.userid > otherUser.userid ? loggedInUser.userid + "-" + otherUser.userid : otherUser.userid + "-" + loggedInUser.userid;
        const messageRef = firestore()
            .collection("UsersBlogApp")
            .doc("chatrooms")
            .collection("chats")
            .doc(docid)
            .collection("messages")
            .orderBy("createdAt", "desc")

        messageRef.onSnapshot((querysnap) => {
            const allmsg = querysnap.docs.map(docsnap => {
                const data = docsnap.data()
                if(data.createdAt){
                    return{
                        ...docsnap.data(),
                        createdAt:docsnap.data().createdAt.toDate()
                    }
                }
                else{
                    return{
                        ...docsnap.data(),
                        createdAt: new Date()
                    }
                }
            })
            setMessages(allmsg)
        })
        
    }, [])

    const getAllMessages = async() => {
        const docid = loggedInUser.userid > otherUser.userid ? loggedInUser.userid + "-" + otherUser.userid : otherUser.userid + "-" + loggedInUser.userid;
        const querySnap = await firestore()
            .collection("UsersBlogApp")
            .doc("chatrooms")
            .collection("chats")
            .doc(docid)
            .collection("messages")
            .orderBy("createdAt", "desc")
            .get()

            const allmsg = querySnap.docs.map(docSnap => {
                return{
                    ...docSnap.data(),
                    createdAt: docSnap.data().createdAt.toDate()
                }
            })
        setMessages(allmsg)
    }

    const onSend = (messageArray) => {
        const msg = messageArray[0];
        const mymsg = {
            ...msg,
            sentBy:loggedInUser.userid,
            sentTo:otherUser.userid,
            createdAt: new Date()
        }

        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = loggedInUser.userid > otherUser.userid ? loggedInUser.userid + "-" + otherUser.userid : otherUser.userid + "-" + loggedInUser.userid;
        firestore()
            .collection("UsersBlogApp")
            .doc("chatrooms")
            .collection("chats")
            .doc(docid)
            .collection("messages")
            .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()})
    }

    return (
        <View style={{ flex: 1, backgroundColor:'#fff' }}>
            <StatusBar barStyle="light-content" backgroundColor="#4857fa" />
            <View style={styles.topTab}>
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back-circle-outline" color="#fff" size={30} />
                        </TouchableOpacity>

                        {otherUser.img ? (
                            <Image source={{uri: otherUser.img}} style={styles.profile} />
                            ) : (
                            <Image source={require('../../pint/logo.png')} style={styles.profile} />
                        )}

                        <Icon name="call" color="#fff" size={30} />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:"#fff", fontWeight:'bold', fontSize:20}}>{otherUser.name}</Text>
                        <Text style={{color:"#fff", fontWeight:'bold'}}>{otherUser.email}</Text>
                    </View>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: loggedInUser.userid,
                }}
                renderBubble={(props) => {
                    return <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor:"#4857fa",
                                borderBottomRightRadius:2
                            },
                            left: {
                                backgroundColor:"#f2f2f2",
                                borderBottomLeftRadius:2
                            }
                        }}
                    />
                }}
                renderInputToolbar={(props) => {
                    return <InputToolbar {...props}
                        containerStyle={{ backgroundColor:'#f2f2f2', borderRadius:7, borderTopColor:'#f2f2f2', marginHorizontal:12 }}
                        textInputStyle={{color:"black"}}
                    />
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    profile:{
        width:70, height:70,
        borderRadius:35,
        marginHorizontal:110
    },
    topTab: {
        width:"100%", height:"20%", backgroundColor:'#4857fa', borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        alignItems:'center',
        paddingTop:20
    }
})

export default Chat
