import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingComponent = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      {isLoading && (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading your movies</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:150
  },
  loadingText:{
    fontSize: 18,
    fontWeight:'700',
    marginTop: 10
  }
});

export default LoadingComponent;
