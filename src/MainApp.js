import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './chat/ChatFeature'; 

const MainApp = () => {

    return (
        <NavigationContainer>
            <ChatScreen/>
        </NavigationContainer>
    )
}

export default MainApp
