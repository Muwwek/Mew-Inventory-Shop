//app/(tabs)/ProductHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles';

interface ProductHeaderProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  onAddProduct: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ onSearch, onFilter, onAddProduct }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="■#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            onChangeText={onSearch} // เชื่อมต่อกับ function ที่ส่งมาจาก props
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductHeader;