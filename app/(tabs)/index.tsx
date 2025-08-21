//app/(tabs)/index.tsx
//npm start
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ProductsScreen from './ProductsScreen';
import BottomNavigation from '@/components/BottomNavigation';

export default function AppLayout() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'products':
        return <ProductsScreen />;
      case 'dashboard':
        return <ProductsScreen />;
      default:
        return (
          <View style={styles.defaultScreen}>
            <Text style={styles.title}>Current Screen: {currentScreen}</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      <BottomNavigation setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  defaultScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});
