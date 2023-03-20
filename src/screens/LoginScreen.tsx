import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

// Theme customization
import {Colors} from '../components/constants/theme';

export default function Login({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Intră în discuție</Title>
      <FormInput
        labelName="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail: React.SetStateAction<string>) =>
          setEmail(userEmail)
        }
      />
      <FormInput
        labelName="Parolă"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword: React.SetStateAction<string>) =>
          setPassword(userPassword)
        }
      />
      <FormButton
        title="Intră în cont"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
      />
      <FormButton
        title="Înregistrează-te"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    color: Colors.white,
    marginBottom: 10,
  },
  loginButtonLabel: {
    color: Colors.black,
    fontSize: 20,
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
