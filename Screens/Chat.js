import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native"; // to get the params

export default function Chat() {
  const route = useRoute();
  const { currentUser, secondUser } = route.params; // Retrieve both users from params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chat between {currentUser.nom} and {secondUser.nom}
      </Text>
      <View style={styles.userInfo}>
        <Text style={styles.userTitle}>Your Info:</Text>
        <Text>Pseudo: {currentUser.pseudo}</Text>
        <Text>Phone: {currentUser.phone}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userTitle}>Other User Info:</Text>
        <Text>Pseudo: {secondUser.pseudo}</Text>
        <Text>Phone: {secondUser.phone}</Text>
      </View>
      {/* You can implement the chat UI here */}
      <View style={styles.chatBox}>
        <Text style={styles.chatPlaceholder}>
          Chat messages will appear here.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  userTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  chatBox: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  chatPlaceholder: {
    color: "#888",
    fontStyle: "italic",
  },
});
