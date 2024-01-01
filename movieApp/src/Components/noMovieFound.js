import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const NoMovieFound = ({ onPressBack }) => (
  <View style={styles.container}>
    <Entypo name="cross" size={34} color="red" />
    <Text style={styles.message}>No movies found</Text>
    <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
      <Text style={styles.backButtonText}>Back to Previous Year</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoMovieFound;
