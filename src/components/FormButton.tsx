import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {Colors} from './constants/theme';

const {width, height} = Dimensions.get('screen');

export default function FormButton({title, modeValue, ...rest}: any) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={modeValue != 'text' && styles.button}
      contentStyle={styles.buttonContainer}>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    color: Colors.black,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: width / 1.5,
    height: height / 15,
  },
});
