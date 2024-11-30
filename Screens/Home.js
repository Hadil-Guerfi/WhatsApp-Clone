import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import { Button } from 'react-native-paper'
import ListProfil from './Home/ListProfil';
import Groupe from './Home/Groupe';
import MyProfil from './Home/MyProfil';
import Chat from './Chat';
const Tab = createMaterialBottomTabNavigator();
export  default function Home () {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListProfil"
        component={ListProfil}
        initialParams={{ currentId: currentId }}></Tab.Screen>
      <Tab.Screen name="Groupe" component={Groupe}></Tab.Screen>
      <Tab.Screen
        name="MyProfil"
        component={MyProfil}
        initialParams={{ currentId: currentId }}></Tab.Screen>
      <Tab.Screen name="Chat" component={Chat}></Tab.Screen>
    </Tab.Navigator>
  );
}


