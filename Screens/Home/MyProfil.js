import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableHighlight,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import navigation hooks
import firebase from "../../config/index";

const database = firebase.database();
const ref_tableProfile = database.ref("Tabledeprofils");

export default function MyProfil() {
  const [nom, setNom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation(); // Navigation instance
  const route = useRoute(); // Get route params
  const { currentId } = route.params; // Destructure currentId from params

  const handleSaveProfile = () => {
    if (nom && pseudo && phone) {
      const ref_unprofil = ref_tableProfile.child(`unprofil${currentId}`);

      ref_unprofil
        .set({
          currentId,
          nom,
          pseudo,
          phone,
        })
        .then(() => {
          Alert.alert("Success", "Profile saved successfully!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("ListProfil"), // Redirect to ListProfil
            },
          ]);
        })
        .catch((error) => {
          Alert.alert("Error", `Failed to save profile: ${error.message}`);
        });
    } else {
      Alert.alert("Validation Error", "All fields are required.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableHighlight
        style={styles.button}
        underlayColor="#6c63ff"
        onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableHighlight>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#7f78d2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
