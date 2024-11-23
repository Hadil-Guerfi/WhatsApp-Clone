import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import { Button } from 'react-native-paper'
import ListProfil from './Home/ListProfil';
import Groupe from './Home/Groupe';
import MyProfil from './Home/MyProfil';
const Tab = createMaterialBottomTabNavigator();
export  default function Home () {
  return (
   <Tab.Navigator>
    <Tab.Screen name='ListProfil'  component={ListProfil}></Tab.Screen>
    <Tab.Screen name='Groupe'  component={Groupe}></Tab.Screen>
    <Tab.Screen name='MyProfil' component={MyProfil} ></Tab.Screen>

   </Tab.Navigator>
  )
}


