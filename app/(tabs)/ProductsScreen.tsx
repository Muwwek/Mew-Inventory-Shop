import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './ProductsScreen.styles';
import ProductHeader from './ProductHeader';
// แก้ไข path การ import
import { apiCall} from '../utils/api';

type Product = {
  id: string;
  name: string;
  stock: number;
  category: string;
  location: string;
  status: string;
  image: string;
  storeAvailable11ty?: any[];
};

const ProductList = ({ products }: { products: Product[] }) => {
  return (
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
                product.status === 'discontinued' && styles.statusButtonDiscontinued,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  product.status === 'discontinued' && styles.statusTextDiscontinued,
                ]}
              >
                {product.status === 'discontinued' ? 'Discontinued' : 'Active'}
              </Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
  
      // เรียก API ได้เลย ไม่ต้องสนใจ token
      const data = await apiCall("/products");
  
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
  
      const parsedData = data.map((product: any) => ({
        ...product,
        storeAvailable11ty: typeof product.storeAvailable11ty === 'string'
          ? JSON.parse(product.storeAvailable11ty || '[]')
          : product.storeAvailable11ty || [],
      }));
  
      setProducts(parsedData);
      console.log(`Loaded ${parsedData.length} products`);
    } catch (err: any) {
      console.error("Fetch products error:", err);
      setError(err.message);
      Alert.alert("Error", `Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRetry = () => {
    fetchProducts();
  };

  return (
    <View style={styles.container}>
      <ProductHeader
        onSearch={(query) => console.log('Search:', query)}
        onFilter={() => console.log('Filter pressed')}
        onAddProduct={() => console.log('Add Product pressed')}
      />
      <Text style={styles.header}>📦 Product List</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {loading ? (
        <ActivityIndicator size="large" color="#7C3AED" />
      ) : (
        <ProductList products={products} />
      )}
    </View>
  );
}

