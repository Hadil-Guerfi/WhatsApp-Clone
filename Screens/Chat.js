import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "../config/index";
import { useRoute } from "@react-navigation/native";

export default function Chat() {
  const route = useRoute();
  const { currentUser, secondUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Generate unique chatId based on user IDs
  const chatId =
    currentUser.uid < secondUser.id
      ? `${currentUser.uid}_${secondUser.id}`
      : `${secondUser.id}_${currentUser.uid}`;

  const messagesRef = firebase.database().ref(`chats/${chatId}/messages`);

  // Fetch messages
  useEffect(() => {
    const unsubscribe = messagesRef.on("value", (snapshot) => {
      if (snapshot && snapshot.val()) {
        const data = snapshot.val();
        const messagesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messagesArray.sort((a, b) => a.timestamp - b.timestamp)); // Sort by timestamp
      } else {
        setMessages([]); // No messages found
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [chatId]); // Include chatId to refetch when it changes

  // Send a new message
  const sendMessage = () => {
    if (messageText.trim() === "") return; // Ignore empty messages

    const newMessage = {
      senderId: currentUser.uid,
      receiverId: secondUser.id,
      text: messageText,
      timestamp: Date.now(),
    };

    messagesRef.push(newMessage, (error) => {
      if (error) {
        console.error("Error sending message:", error);
      } else {
        setMessageText(""); // Clear input
      }
    });
  };

  // Render a single message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.senderId === currentUser.uid
          ? styles.sentMessage
          : styles.receivedMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "80%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7ff",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
