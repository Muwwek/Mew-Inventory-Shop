// app/(tabs)/AddProduct.tsx
import { useRouter } from "expo-router";
import React from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from './AddProduct.Styles';

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [category, setCategory] = React.useState("Badminton Rackets");
  const [location, setLocation] = React.useState("");
  const [status, setStatus] = React.useState("Active");
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(null);
  
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleAddProduct = async () => {
    if (!name.trim() || !stock.trim() || !category.trim() || !location.trim()) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      const product = {
        name: name.trim(),
        stock: parseInt(stock) || 0,
        category: category.trim(),
        location: location.trim() + " Stores", 
        status: status,
        image: image ? image.uri : null,
      };

      const res = await fetch("http://nindam.sytes.net:3044/api/products", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        router.push({
          pathname: '/ProductsScreen',
          params: { successMessage: `Product "${product.name}" has been created!` },
        });
      } else {
          const responseText = await res.text();
          const errorData = JSON.parse(responseText);

          if (res.status === 413 || errorData.error === 'Image too large') {
            Alert.alert(
              "Image Too Large",
              "The selected image is too large. Please choose a smaller file." 
            );
          } else {
            Alert.alert(
              `Error: ${res.status}`, 
              errorData.error || "Failed to add product"
            );
          }
      }
    } catch (error: any) {
      console.error('Fetch Error:', error);
      Alert.alert("Network Error", error.message || "Cannot connect to the server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Product Image</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.imagePickerText}>Click to select an image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Product Name *</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter product name"
          style={styles.input}
        />

        <Text style={styles.label}>Stock *</Text>
        <TextInput
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
          placeholder="Enter stock quantity"
          style={styles.input}
        />

        {/* ✅ Category Dropdown */}
        <Text style={styles.label}>Category *</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: 'Badminton Rackets', value: 'Badminton Rackets' },
              { label: 'Badminton Shoes', value: 'Badminton Shoes' },
              { label: 'Badminton Shirts', value: 'Badminton Shirts' },
            ]}
            style={pickerSelectStyles}
            value={category}
            placeholder={{}}
          />
        </View>

        {/* ✅ Location auto add "Stores" */}
        <Text style={styles.label}>Location *</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
          style={styles.input}
        />
        <Text style={{ color: "#6B7280", marginBottom: 16, fontSize: 14 }}>
          (Will be saved as: `{location || '...'} Stores`)
        </Text>

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setStatus(value)}
            items={[
              { label: 'Active', value: 'Active' },
              { label: 'Discontinued', value: 'Discontinued' },
            ]}
            style={pickerSelectStyles}
            value={status}
            placeholder={{}}
          />
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button 
              title="Go Back" 
              color="#6B7280" 
              onPress={() => router.push('/ProductsScreen')} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Add Product" color="#8B5CF6" onPress={handleAddProduct} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProduct;
