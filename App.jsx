import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Register from './Component/Register';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './Component/Login';
import Home from './Component/Home';

const Stack = createNativeStackNavigator();

export default function LoginRegister() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} options={{headerShown:true}}/>
        <Stack.Screen name='Home' component={Home}   />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
