import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import firebase from "../../config/index";
import { useNavigation } from "@react-navigation/native";

const database = firebase.database();
const ref_tableProfile = database.ref("Tabledeprofils");

export default function ListProfil() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook to navigate
  const [currentUser, setCurrentUser] = useState({});

  const route = useRoute(); // Get route params
  const { currentId } = route.params; // Destructure currentId from params

  useEffect(() => {
    const fetchProfiles = () => {
      ref_tableProfile.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const profilesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const foundUser = profilesArray.find(
            (profile) => profile.id === currentId
          );

          if (foundUser) {
            setCurrentUser(foundUser);
            setProfiles(
              profilesArray.filter((profile) => profile.id !== currentId)
            ); // Exclude the current user from the list
          } else {
            setProfiles(profilesArray);
          }
        } else {
          setProfiles([]);
        }
        setLoading(false);
      });
    };

    fetchProfiles();

    return () => ref_tableProfile.off("value");
  }, []);

  const deleteProfile = (id) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            ref_tableProfile
              .child(id)
              .remove()
              .then(() => {
                Alert.alert("Success", "Profile deleted successfully!");
              })
              .catch((error) => {
                Alert.alert(
                  "Error",
                  `Failed to delete profile: ${error.message}`
                );
              });
          },
        },
      ]
    );
  };

  const renderProfile = ({ item }) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileName}>Nom: {item.nom}</Text>
      <Text>Pseudo: {item.pseudo}</Text>
      <Text>Phone: {item.phone}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteProfile(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate("Chat", {currentUser, secondUser: item })}>
        <Text style={styles.chatButtonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiles List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#7f78d2" />
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={renderProfile}
          ListEmptyComponent={
            <Text style={styles.emptyList}>No profiles available.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chatButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50", // Green color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyList: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});
