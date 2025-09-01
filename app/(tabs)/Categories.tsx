import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categories Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // set background to white
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
