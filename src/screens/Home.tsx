import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Title} from 'react-native-paper';
import FormButton from '../components/FormButton';
import {Colors} from '../components/constants/theme';
// Auth statements
import {AuthContext} from '../navigation/AuthProvider';

export default function HomeScreen({navigation}: any) {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Evenimente listate:</Title>
      <Text style={{marginBottom: 20}}>{user.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
  },

  container: {
    backgroundColor: '#f5f5f5',
    color: '#000',
    padding: 15,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
