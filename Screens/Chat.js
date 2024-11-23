import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native"; // to get the params

export default function Chat() {
  const route = useRoute();
  const { profile } = route.params; // Retrieve profile data passed from ListProfil

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {profile.nom}</Text>
      <Text>Pseudo: {profile.pseudo}</Text>
      <Text>Phone: {profile.phone}</Text>
      {/* Here you can render the chat UI */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
