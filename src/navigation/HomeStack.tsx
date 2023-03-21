import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';

// Constants
import {Colors} from '../components/constants/theme';

// Screens
import HomeScreen from '../screens/Home';
import AddEventScreen from '../screens/AddEventScreen';

// Icons
import {IconButton} from 'react-native-paper';

// Inits
const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp({navigation}: any) {
  return (
    <ChatAppStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: Colors.white,
        },
      }}>
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Evenimentele mele',
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={24}
              color="#ffffff"
              onPress={() => navigation.navigate('AddEvent')}
            />
          ),
        }}
      />
    </ChatAppStack.Navigator>
  );
}

export default function HomeStack() {
  return (
    <ModalStack.Navigator
      screenOptions={{presentation: 'modal', headerShown: false}}>
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddEvent" component={AddEventScreen} />
    </ModalStack.Navigator>
  );
}
