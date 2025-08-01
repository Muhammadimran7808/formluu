'use client';

import { useDrop } from 'react-dnd';
import { FormField as FormFieldType } from '@/types/form';
import FormField from './form-field';

interface FormCanvasProps {
  fields: FormFieldType[];
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldAdd: (fieldType: string) => void;
  onFieldRemove: (fieldId: string) => void;
}

export default function FormCanvas({
  fields,
  selectedFieldId,
  onFieldSelect,
  onFieldAdd,
  onFieldRemove
}: FormCanvasProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item: { type: string }) => {
      onFieldAdd(item.type);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Form Builder</h1>
          <p className="text-gray-600">Drag and drop elements to create your form</p>
        </div>

        <div
          ref={drop}
          className={`
            min-h-[600px] bg-white rounded-lg border-2 border-dashed p-6
            ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
            transition-all duration-200
          `}
        >
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium mb-2">Start building your form</h3>
              <p className="text-sm">Drag form elements from the left panel</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="relative group">
                  <FormField
                    field={field}
                    isSelected={selectedFieldId === field.id}
                    onSelect={() => onFieldSelect(field.id)}
                  />
                  
                  {/* Remove button */}
                  <button
                    onClick={() => onFieldRemove(field.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             flex items-center justify-center text-sm hover:bg-red-600"
                    title="Remove field"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 