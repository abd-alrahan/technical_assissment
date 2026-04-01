/**
 * Product Details Modal Component
 * Displays full product information in a modal
 */

import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star, Package, DollarSign, TrendingUp } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  if (!product) return null;

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          {product.thumbnail && (
            <div className="flex justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-64 w-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Price</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">${discountedPrice}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {product.discountPercentage > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Discount</span>
                </div>
                <Badge variant="secondary" className="text-lg">
                  {product.discountPercentage}% OFF
                </Badge>
              </div>
            )}
          </div>

          {/* Rating and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{product.rating}</span>
                <span className="text-sm text-muted-foreground">/5</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{product.stock}</span>
                <span className="text-sm text-muted-foreground">units</span>
              </div>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Category
              </p>
              <p className="text-sm font-medium">{product.category}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Brand
              </p>
              <p className="text-sm font-medium">{product.brand}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                SKU
              </p>
              <p className="text-sm font-mono">{product.sku}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Weight
              </p>
              <p className="text-sm font-medium">{product.weight} kg</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Status
              </p>
              <p className="text-sm font-medium">{product.availabilityStatus}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Min Order
              </p>
              <p className="text-sm font-medium">{product.minimumOrderQuantity}</p>
            </div>
          </div>

          {/* Dimensions */}
          {product.dimensions && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                Dimensions
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Width</p>
                  <p className="text-sm font-medium">{product.dimensions.width} cm</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Height</p>
                  <p className="text-sm font-medium">{product.dimensions.height} cm</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Depth</p>
                  <p className="text-sm font-medium">{product.dimensions.depth} cm</p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Warranty and Shipping */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Warranty
              </p>
              <p className="text-sm">{product.warrantyInformation}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Shipping
              </p>
              <p className="text-sm">{product.shippingInformation}</p>
            </div>
          </div>

          {/* Return Policy */}
          <div className="pt-4 border-t">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Return Policy
            </p>
            <p className="text-sm">{product.returnPolicy}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
