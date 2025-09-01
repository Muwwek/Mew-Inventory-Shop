import React, { useEffect, useState ,} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './ProductsScreen.styles';
import { useRouter } from 'expo-router';

type Product = {
  id: string;
  name: string;
  stock: number;
  category: string;
  location: string;
  status: string;
  image: string;
};

const ProductList = ({ products }: { products: Product[] }) => (
  <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
    {products.map((product) => (
      <View key={product.id} style={styles.productCard}>
        <View style={styles.cardTop}>
          <Image
            source={{ uri: product.image || 'https://via.placeholder.com/150' }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.detailText}>Stock: {product.stock} in stock</Text>
            <Text style={styles.detailText}>Category: {product.category}</Text>
            <Text style={styles.detailText}>Location: {product.location}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.statusButton,
              product.status === 'Discontinued' && styles.statusButtonDiscontinued,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                product.status === 'Discontinued' && styles.statusTextDiscontinued,
              ]}
            >
              {product.status}
            </Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{product.name}</Text>
      </View>
    ))}
  </ScrollView>
);

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://nindam.sytes.net:3044/api/products");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Error", `Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = () => {
    console.log("Filter pressed");
  };

  const handleAddProduct = () => {
    console.log("Navigate to AddProduct");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Search & Actions */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/AddProduct')} // ✅ ไปหน้า AddProduct
        >
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>📦 Product List</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchProducts} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#7C3AED" />
      ) : (
        <ProductList products={products} />
      )}
    </SafeAreaView>
  );
}
