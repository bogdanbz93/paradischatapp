import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

// Constants
import {Colors} from './constants/theme';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
