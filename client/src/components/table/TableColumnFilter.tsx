/**
 * Table Column Filter Component
 * Provides filtering input for a specific column
 */

import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TableColumnFilterProps {
  columnLabel: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function TableColumnFilter({
  columnLabel,
  value,
  onChange,
  onClear,
}: TableColumnFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder={`Filter ${columnLabel.toLowerCase()}...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 text-sm"
      />
      {value && (
        <button
          onClick={onClear}
          className="p-1 hover:bg-muted rounded transition-colors"
          title="Clear filter"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
