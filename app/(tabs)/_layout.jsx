import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5,FontAwesome6,Fontisto,Entypo } from '@expo/vector-icons';

import { color } from 'react-native-elements/dist/helpers';


const TabsLayout = () => {
  return (
    <Tabs 
      screenOptions={{
        headerShown:false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#A7C7E7',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><FontAwesome5 name="home" 
          size={24} color={color}/>
        }}
      />
      <Tabs.Screen
        name="medication"
        options={{
          tabBarLabel:'Medication',
          tabBarIcon:({color})=><FontAwesome6 name="briefcase-medical" 
          size={24} color={color}/>
        }}
      />
      <Tabs.Screen
        name="symptoms"
        options={{  tabBarLabel:'Symptoms',
        tabBarIcon:({color})=><FontAwesome6 name="head-side-cough" 
        size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="bloodTests"
        options={{  tabBarLabel:'Blood Tests',
        tabBarIcon:({color})=><Fontisto name="blood-test" 
        size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{  tabBarLabel:'Reminders',
        tabBarIcon:({color})=><Entypo name="bell" 
        size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="news"
        options={{  tabBarLabel:'News',
        tabBarIcon:({color})=><FontAwesome6 name="newspaper" 
        size={24} color={color}/>
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
