import React from 'react';
import {View, Text} from 'react-native';
import FormButton from '../components/FormButton';

export default function AddEventScreen({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Creaza un nou eveniment</Text>
      <FormButton
        mode="contained"
        title="Inchide fereastra"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
