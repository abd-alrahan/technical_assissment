/**
 * Draggable Column Header Component
 * Allows users to reorder columns via drag and drop
 */

import { useState, useRef } from 'react';
import { GripVertical, ArrowUpDown } from 'lucide-react';

interface DraggableColumnHeaderProps {
  label: string;
  sortOrder: 'asc' | 'desc' | null;
  onSort: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
}

export function DraggableColumnHeader({
  label,
  sortOrder,
  onSort,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: DraggableColumnHeaderProps) {
  const [showDragHandle, setShowDragHandle] = useState(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={() => setShowDragHandle(true)}
      onMouseLeave={() => setShowDragHandle(false)}
      className={`
        flex items-center gap-2 px-4 py-2 cursor-move select-none
        transition-colors duration-200
        ${isDragging ? 'bg-primary/10 opacity-50' : 'hover:bg-muted/50'}
      `}
    >
      {showDragHandle && (
        <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      )}
      <button
        onClick={onSort}
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <span className="font-medium">{label}</span>
        <ArrowUpDown
          className={`h-4 w-4 transition-all ${
            sortOrder === 'asc'
              ? 'text-primary'
              : sortOrder === 'desc'
                ? 'text-primary rotate-180'
                : 'text-muted-foreground'
          }`}
        />
      </button>
    </div>
  );
}
