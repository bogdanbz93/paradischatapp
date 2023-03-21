import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

// Constants
import {Colors} from '../components/constants/theme';

export default function AddEventScreen({navigation}: any) {
  const [roomName, setRoomName] = useState('');

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={28}
          iconColor="#555"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Creează un nou eveniment</Title>
        <FormInput
          labelName="Nume eveniment"
          value={roomName}
          onChangeText={(text: React.SetStateAction<string>) =>
            setRoomName(text)
          }
          color="#000"
        />
        <FormButton
          title="Creează"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
  rootContainer: {
    position: 'relative',
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 20,
  },
});
