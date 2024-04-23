// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Join Chat' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat Room' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
