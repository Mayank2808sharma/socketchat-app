import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import io from 'socket.io-client';

// Make sure to replace this with your actual server's address and port
const socket = io("http://localhost:3000");

function ChatScreen({ route, navigation }) {
  const { username, room } = route.params;
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('join room', { username, room });

    // Handling previous messages
    socket.on('previous messages', (messages) => {
      setChat(messages);
    });

    // Handling new incoming messages
    socket.on('chat message', (msg) => {
        console.log(msg)
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('chat message');
      socket.off('previous messages');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', { username, room, message });
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chat}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBox,
            item.username === username ? styles.rightMessage : styles.leftMessage
          ]}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10
  },
  messageBox: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '70%'
  },
  rightMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end'
  },
  leftMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start'
  },
  messageText: {
    color: '#333'
  }
});

export default ChatScreen;
