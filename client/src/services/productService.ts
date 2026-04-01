/**
 * Products Service
 * Handles all product-related API calls
 */

import { ProductsResponse } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

export const productService = {
  /**
   * Fetch all products
   */
  async getProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/products?limit=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: ProductsResponse = await response.json();
    return data;
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return data;
  },
};
