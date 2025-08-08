import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // ✅ เพิ่มไอคอนที่ใช้

type Props = {
  setCurrentScreen: (screen: string) => void;
  currentScreen: string;
};

export default function BottomNavigation({ setCurrentScreen, currentScreen }: Props) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('dashboard')}>
        <Ionicons name="home" size={24} color={currentScreen === 'dashboard' ? '#8B5CF6' : '#444'} />
        <Text style={[styles.navText, currentScreen === 'dashboard' && styles.activeText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('Add Menu')}>
        <Ionicons name="add-circle" size={24} color={currentScreen === 'Add Menu' ? '#8B5CF6' : '#444'} />
        <Text style={[styles.navText, currentScreen === 'Add Menu' && styles.activeText]}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('products')}>
        <FontAwesome5 name="box-open" size={22} color={currentScreen === 'products' ? '#8B5CF6' : '#444'} />
        <Text style={[styles.navText, currentScreen === 'products' && styles.activeText]}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('categories')}>
        <MaterialIcons name="category" size={24} color={currentScreen === 'categories' ? '#8B5CF6' : '#444'} />
        <Text style={[styles.navText, currentScreen === 'categories' && styles.activeText]}>Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#444',
  },
  activeText: {
    color: '#8B5CF6',
  },
});
