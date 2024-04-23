    // HomeScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('General');  // Default room

  const handleJoin = () => {
    if (username && room) {
      navigation.navigate('Chat', { username, room });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Room"
        value={room}
        onChangeText={setRoom}
      />
      <Button title="Join Chat" onPress={handleJoin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10
  }
});

export default HomeScreen;
