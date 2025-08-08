// app/(tabs)/ProductsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import ProductHeader from './ProductHeader';

type Product = {
  id: string;
  name: string;
  stock: number;
  category: string;
  location: string;
  status: string;
  image: string;
};

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.cardTop}>
            <Image
              source={{ uri: product.image }}
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

  useEffect(() => {
    fetch('http://localhost:3044/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ProductHeader
        onSearch={(query) => console.log('Search:', query)}
        onFilter={() => console.log('Filter pressed')}
        onAddProduct={() => console.log('Add Product pressed')}
      />
      <Text style={styles.header}>📦 Product List</Text>
      {loading ? <ActivityIndicator size="large" color="#7C3AED" /> : <ProductList products={products} />}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productList: {
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  statusButton: {
    flexDirection: 'row',
    backgroundColor: '#7C3AED', // purple-600
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  statusButtonDiscontinued: {
    backgroundColor: '#D1D5DB', // gray-300
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  statusTextDiscontinued: {
    color: '#6B7280', // gray-500
  },
  arrowIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
    marginTop: -1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});
