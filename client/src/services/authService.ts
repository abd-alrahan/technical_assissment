/**
 * Authentication Service
 * Handles all authentication-related API calls and token management
 */

import { LoginCredentials, AuthResponse } from '@/types/auth';

const API_BASE_URL = 'https://dummyjson.com';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authService = {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data: AuthResponse = await response.json();
    return data;
  },

  /**
   * Store token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Retrieve token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Store user data in localStorage
   */
  setUser(user: AuthResponse): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Retrieve user data from localStorage
   */
  getUser(): AuthResponse | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Clear all auth data
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
