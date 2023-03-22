import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

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

// Auth statements
import {AuthContext} from '../navigation/AuthProvider';
import EventScreen from '../screens/EventScreen';

function ChatApp({navigation}: any) {
  const {logout} = useContext(AuthContext);

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
          headerLeft: () => (
            <IconButton
              icon="logout"
              size={24}
              iconColor="#fff"
              onPress={() => logout()}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="plus-circle"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.navigate('AddEvent')}
            />
          ),
        }}
      />
      <ChatAppStack.Screen
        name="Event"
        component={EventScreen}
        options={{
          title: 'Evenimentele mele',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={24}
              iconColor="#fff"
              onPress={() => navigation.goBack()}
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
