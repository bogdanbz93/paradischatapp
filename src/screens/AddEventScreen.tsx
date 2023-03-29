import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import firestore, {firebase} from '@react-native-firebase/firestore';

// Constants
import {Colors} from '../components/constants/theme';

// Auth Statements
import {AuthContext} from '../navigation/AuthProvider';

// Components
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function AddEventScreen({navigation}: any) {
  const [eventName, setEventName] = useState('');
  const {user} = useContext(AuthContext);

  function handleButtonPress() {
    if (eventName.length > 0) {
      firestore()
        .collection('EVENTS')
        .add({
          name: eventName,
          user: user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          latestMessage: {
            text: `Ai pornit discuția în ${eventName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `Ați selectat evenimentul "${eventName}". \n\nLăsați-ne un mesaj și vă vom răspunde cât de repede posibil. Cu ce vă putem ajuta?`,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate('Home');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

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
          value={eventName}
          onChangeText={(text: React.SetStateAction<string>) =>
            setEventName(text)
          }
          color="#000"
        />
        <FormButton
          title="Creează"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={eventName.length === 0}
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
