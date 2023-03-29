import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Colors} from '../components/constants/theme';

// Auth statements
import {AuthContext} from '../navigation/AuthProvider';

export default function SignupScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Înregistrează un cont</Title>
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
        title="Creează un cont"
        modeValue="contained"
        onPress={() => register(email, password)}
        labelStyle={styles.loginButtonLabel}
      />
      <FormButton
        title="Ai deja un cont?"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f5f5f5',
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
    color: Colors.white,
    fontSize: 20,
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  navButton: {
    marginTop: 10,
  },
});
