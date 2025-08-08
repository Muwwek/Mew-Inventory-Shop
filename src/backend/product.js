//src/backend/product.js

export const fetchProducts = async () => {
  try {
    const response = await fetch('http://119.59.102.61/std6630202805/product.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      error: error.message
    };
  }
};