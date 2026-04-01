/**
 * Products Table Component
 * Main table component with filtering, sorting, and draggable columns
 */

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { DraggableColumnHeader } from "./DraggableColumnHeader";
import { TableColumnFilter } from "./TableColumnFilter";
import { ProductDetailsModal } from "@/components/modal/ProductDetailsModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

type SortOrder = "asc" | "desc" | null;
type ColumnKey =
  | "id"
  | "title"
  | "category"
  | "brand"
  | "price"
  | "rating"
  | "stock";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
  sortable: boolean;
  filterable: boolean;
  render?: (value: any) => string;
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: "id", label: "ID", sortable: true, filterable: true },
  { key: "title", label: "Title", sortable: true, filterable: true },
  { key: "category", label: "Category", sortable: true, filterable: true },
  { key: "brand", label: "Brand", sortable: true, filterable: true },
  {
    key: "price",
    label: "Price",
    sortable: true,
    filterable: false,
    render: (value: number) => `$${value.toFixed(2)}`,
  },
  {
    key: "rating",
    label: "Rating",
    sortable: true,
    filterable: false,
    render: (value: number) => `${value}/5`,
  },
  { key: "stock", label: "Stock", sortable: true, filterable: false },
];

export function ProductsTable({
  products,
  isLoading,
  error,
}: ProductsTableProps) {
  const [columns, setColumns] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortColumn, setSortColumn] = useState<ColumnKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const productValue = String(product[key as ColumnKey]).toLowerCase();
        if (key === "id") {
          return productValue === value.toLowerCase();
        }
        return productValue.includes(value.toLowerCase());
      });
    });
  }, [products, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!sortColumn || !sortOrder) return filteredProducts;

    const sorted = [...filteredProducts].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      if (typeof aValue === "string") {
        const strA = String(aValue);
        const strB = String(bValue);
        return sortOrder === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }

      if (typeof aValue === "number") {
        return sortOrder === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }

      return 0;
    });

    return sorted;
  }, [filteredProducts, sortColumn, sortOrder]);

  const handleSort = (columnKey: ColumnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(columnKey);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
  };

  const handleClearFilter = (columnKey: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: "",
    }));
  };

  const handleDragStart = (e: React.DragEvent, columnKey: string) => {
    setDraggedColumn(columnKey);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumnKey: string) => {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColumnKey) {
      setDraggedColumn(null);
      return;
    }

    const draggedIndex = columns.findIndex((col) => col.key === draggedColumn);
    const targetIndex = columns.findIndex((col) => col.key === targetColumnKey);

    const newColumns = [...columns];
    [newColumns[draggedIndex], newColumns[targetIndex]] = [
      newColumns[targetIndex],
      newColumns[draggedIndex],
    ];

    setColumns(newColumns);
    setDraggedColumn(null);
  };

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-lg font-semibold text-destructive mb-2">
            Error Loading Products
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">No Products Found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Filters */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {columns
              .filter((col) => col.filterable)
              .map((column) => (
                <TableColumnFilter
                  key={column.key}
                  columnLabel={column.label}
                  value={filters[column.key] || ""}
                  onChange={(value) => handleFilterChange(column.key, value)}
                  onClear={() => handleClearFilter(column.key)}
                />
              ))}
          </div>
          {Object.values(filters).some((f) => f) && (
            <div className="mt-3 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({})}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {sortedProducts.length} of {products.length} products
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead key={column.key} className="p-0">
                    <DraggableColumnHeader
                      label={column.label}
                      sortOrder={sortColumn === column.key ? sortOrder : null}
                      onSort={() => handleSort(column.key)}
                      onDragStart={(e) => handleDragStart(e, column.key)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.key)}
                      isDragging={draggedColumn === column.key}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  onClick={() => handleRowClick(product)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-3">
                      {column.render
                        ? column.render(product[column.key])
                        : String(product[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sortedProducts.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">
              No products match your filters
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
