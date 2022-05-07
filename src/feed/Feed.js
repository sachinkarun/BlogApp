import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import LikePost from './LikePost';
import PostAuthor from './PostAuthor';

const Feed = ({ navigation }) => {
    const [feeds, setFeeds] = useState([]);
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        getFeeds()
    },[])

    const onRefreshList = () => {
        setRefreshList(true)
        getFeeds()
        setRefreshList(false)
    }

    const dates = (num) => {
        var d = new Date(num);
        var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        var dateFormatted = monthArray[d.getMonth()] + ' ' + d.getDate();
        return dateFormatted;
    }

    const getFeeds = async () => {
        setFeeds([]);
        await firestore()
            .collection("UsersBlogApp")
            .doc("Posts")
            .collection("UserPosts")
            .get()
            .then((snapshot) => {
                snapshot.docs.map(post => {
                    let newPost = post.data()
                    setFeeds(currentFeeds => [...currentFeeds, newPost])
                })
            })
    }

    if(feeds.length == 0){
        return(
            <View style={styles.container2}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.header}>
                    <Text style={styles.title}>Latest blogs</Text>
                    <View style={{flexDirection:'row'}}>

                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Icon name="person-circle" color="black" size={35} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('List')}>
                            <Icon name="chatbubbles-outline" color="black" size={30} />
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.loading}>
                    <ActivityIndicator color="#4857fa" size="large" />
                </View>

                <View style={{position:'absolute'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddPost')}
                    
                    style={styles.addpost}>
                        <Text style={styles.add}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <Text style={styles.title}>Latest blogs</Text>
                <View style={{flexDirection:'row'}}>

                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon name="person-circle" color="black" size={35} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('List')}>
                        <Icon name="chatbubbles-outline" color="black" size={30} />
                    </TouchableOpacity>

                </View>
            </View>

            <FlatList
                refreshControl={
                    <RefreshControl
                    refreshing={refreshList}
                    onRefresh={onRefreshList}
                    />
                }
                data={feeds}
                keyExtractor={(feeds) => feeds.postId}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.card}>

                        <View style={{flexDirection:"row", alignItems:'center', marginTop:20}}>
                            <PostAuthor data={item.userId} />

                            <View style={styles.userTitle}>

                                <View>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={{marginLeft:15}}>{dates(item.time)}</Text>
                                </View>

                                <Icon name="ios-ellipsis-horizontal" color="black" size={30} />
                            </View>
                        </View>

                        <Text style={styles.userCaption}>
                            {item.caption}
                        </Text>

                        <View style={{alignItems:'center'}}>
                            <LikePost data={item.postId}/>
                        </View>

                    </View>
                )}
            />

            <View style={{position:'absolute'}}>
                <TouchableOpacity onPress={() => navigation.navigate('AddPost')}
                    style={styles.addpost}>
                    <Text style={styles.add}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        alignItems:'center',
        marginBottom:85
    },

    container2: {
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center'
    },

    header: {
        marginVertical:25,
        flexDirection:'row',
        justifyContent:'space-between',
        width:"90%"
    },

    title: {
        fontSize:25,
        fontWeight:'bold',
        color:'black'
    },

    loading:{
        marginTop:"75%"
    },

    add:{
        color:"#fff",
        fontSize:40
    },

    addpost:{
        width:60,
        height:60,
        backgroundColor:"#4857fa",
        marginTop:690,
        marginLeft:270,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },

    card: {
        backgroundColor:"#f2f2f2",
        width:345,
        borderRadius:20,
        marginBottom:20
    },

    userCaption: {
        color:"black",
        fontSize:15,
        fontWeight:'500',
        paddingHorizontal:20,
        paddingTop:30,
        paddingBottom:20
    },

    userName: {
        fontWeight:'bold',
        fontSize:18,
        color:"black",
        marginLeft:10,
        paddingRight:10
    },

    userTitle: {
        flexDirection:'row',
        width:260,
        justifyContent:'space-between'
    }
})

export default Feed
