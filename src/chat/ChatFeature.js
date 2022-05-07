import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './List';
import ChatScreen from './Chat';
import ProfileScreen from './Profile';
import FeedScreen from '../feed/Feed';
import AddPostScreen from '../feed/AddPost';

const Stack = createNativeStackNavigator();  

const ChatFeature = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown:false }} />
        <Stack.Screen name="List" component={ListScreen} options={{ headerShown:false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown:false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTintColor:"#fff", headerStyle: { backgroundColor: '#4857fa' } }} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
      </Stack.Navigator>
  );
}

export default ChatFeature;