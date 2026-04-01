/**
 * Dashboard Page
 * Protected page displaying products table
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import { ProductsTable } from '@/components/table/ProductsTable';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productService.getProducts();
        setProducts(response.products);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Products Dashboard</h1>
              <p className="text-xs text-slate-500">Manage and explore products</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Title */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Products Catalog</h2>
            <p className="text-slate-600">
              Browse, filter, sort, and explore detailed information about our products.
              Click on any row to view full details.
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <ProductsTable
              products={products}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
