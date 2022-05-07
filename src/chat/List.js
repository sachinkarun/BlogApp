import React,{ useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const List = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [list, setList] = useState([]);
    const [refreshList, setRefreshList] = useState(false);

    useEffect(() => {
        getUser()
        getList()
    }, [])

    const onRefreshList = () => {
        setRefreshList(true)
        getList()
        setRefreshList(false)
    }

    const getList = () => {
        setList([])
        firestore()
            .collection("UsersBlogApp")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setList(list => [...list, doc._data])
                })
            })
    }

    const getUser = () => {
        firestore()
            .collection("UsersBlogApp")
            .doc(auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                setUser(snapshot._data);
            })
    }

    if(!user){
        return(
            <View style={styles.container}>
                <View style={{marginTop:25, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
                <Text style={{fontWeight:'bold', color:"black", fontSize:33, marginLeft:25}}>Messages</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                        <Icon name="list" color="black" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight:15}}>
                        <Icon name="search" color="black" size={30} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={require('../../pint/img7.jpg')} style={{width:"90%", height:"20%", marginBottom:20, marginLeft:"5%", borderRadius:15}} />

                <ActivityIndicator color="#4857fa" size="large" />
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <View style={{marginTop:25, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
                <Text style={{fontWeight:'bold', color:"black", fontSize:33, marginLeft:25}}>Messages</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                        <Icon name="list" color="black" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight:15}}>
                        <Icon name="search" color="black" size={30} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={require('../../pint/img7.jpg')} style={{width:"90%", height:"20%", marginBottom:20, marginLeft:"5%", borderRadius:15}} />

            {list.length > 0 ? (
                <FlatList
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshList}
                        onRefresh={onRefreshList}
                        />
                    }
                    data={list}
                    renderItem={({item}) => (
                        <View>
                            {user.name == item.name ? null : (
                                <TouchableOpacity onPress={() => navigation.navigate('Chat', { otherUser:item, loggedInUser:user })} style={{marginVertical:5}}>
                                    <View style={{flexDirection:'row'}}>
                                        {item.img ? (
                                            <Image source={{uri: item.img}} style={styles.profilePic} />
                                            ) : (
                                                <Image source={require('../../pint/logo.png')} style={styles.profilePic} />
                                        )}
                                        <View style={{justifyContent:'center', paddingLeft:10}}>
                                            <Text style={styles.names}>{item.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{width:"75%", height:1, backgroundColor:'#bfbfbf', marginLeft:75, marginTop:10}}></View>    
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    contacts:{
        borderBottomWidth:0.5,
        borderBottomColor:"black",
        paddingVertical:10,
        paddingLeft:15
    },
    profilePic:{
        width:50, height:50, borderRadius:25,
        marginLeft:20
    },
    names:{
        color:"black",
        fontWeight:'bold',
        fontSize:18
    }
})

export default List
