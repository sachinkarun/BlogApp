import React,{ useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/auth/Login'
import RegisterScreen from './src/auth/Register';
import MainApp from './src/MainApp';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;// unsubscribe on unmount
  }, []);


  if(initializing){
    return(
      <View style={{flex:1, backgroundColor:'#1d242f', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#009394"/>
      </View>
    )
  }

  if(user){
    return(
      <MainApp />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown:false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
