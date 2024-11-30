import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ListProfil from "./Home/ListProfil";
import Groupe from "./Home/Groupe";
import MyProfil from "./Home/MyProfil";
import Chat from "./Chat";
import firebase from "../config";

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
const auth = firebase.auth();

  // Retrieve the currently authenticated user's ID
  const userId = auth.currentUser.uid;

  if (!userId) {
    console.error("User not authenticated!");
    return null; // Optionally, navigate to a login screen or show an error
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListProfil"
        component={ListProfil}
        initialParams={{ currentId: userId }} // Pass userId here
      />
      <Tab.Screen name="Groupe" component={Groupe} />
      <Tab.Screen
        name="MyProfil"
        component={MyProfil}
        initialParams={{ currentId: userId }} // Pass userId here
      />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}
