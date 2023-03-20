import React from 'react';
import {StyleSheet, Dimensions, TextInput} from 'react-native';
import {Colors} from './constants/theme';
// import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export default function FormInput({labelName, ...rest}: any) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      placeholder={labelName}
      placeholderTextColor="#7B7B7B"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: width / 1.5,
    height: height / 15,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    color: Colors.white,
  },
});
