import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';

// Constants
import {Colors} from '../components/constants/theme';

export default function AddEventScreen({navigation}: any) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>Creează un nou eveniment</Text>
      <FormButton
        mode="contained"
        title="Inchide fereastra"
        labelStyle={styles.navButtonText}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
});
