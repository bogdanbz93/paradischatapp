import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import FormButton from '../components/FormButton';

// Auth statements
import {AuthContext} from '../navigation/AuthProvider';

export default function HomeScreen() {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title>Evenimente</Title>
      <Title style={{textAlign: 'center', fontSize: 12}}>
        Esti logat in: {JSON.stringify(user)}
      </Title>
      <FormButton
        modeValue="contained"
        title="Logout"
        onPress={() => logout()}
        labelStyle={{fontSize: 20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
