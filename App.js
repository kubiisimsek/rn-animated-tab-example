import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
