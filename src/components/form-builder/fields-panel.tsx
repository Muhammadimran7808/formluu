'use client';

import { useDrag } from 'react-dnd';
import React from 'react';
import { AVAILABLE_FIELDS } from './available-fields';

interface DraggableFieldItemProps {
  field: {
    type: string;
    label: string;
    icon: string;
  };
}

const DraggableFieldItem = ({ field }: DraggableFieldItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: { type: field.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`
        flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-300 
        bg-white cursor-move transition-all duration-200 hover:border-blue-400 
        hover:bg-blue-50 ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <span className="text-xl">{field.icon}</span>
      <span className="font-medium text-gray-700">{field.label}</span>
    </div>
  );
};

export default function FieldsPanel() {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Form Elements</h2>
        <p className="text-sm text-gray-600">Drag elements to build your form</p>
      </div>
      
      <div className="space-y-3">
        {AVAILABLE_FIELDS.map((field) => (
          <DraggableFieldItem key={field.type} field={field} />
        ))}
      </div>
    </div>
  );
} 