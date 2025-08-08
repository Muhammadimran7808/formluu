'use client';

import { FormField as FormFieldType } from '@/types/form';
import React from 'react';
import { Rate } from 'antd';

interface FormFieldProps {
  field: FormFieldType;
  isSelected: boolean;
  onSelect: () => void;
}

export default function FormField({ field, isSelected, onSelect }: FormFieldProps) {
  const renderField = () => {
    switch (field.type) {
      case 'short-text':
        return (
          <input
            type="text"
            placeholder={field.placeholder || 'Enter text...'}
            className="w-full px-3 py-2 border border-primary rounded-md placeholder-primary"
            disabled
          />
        );
      
      case 'long-text':
        return (
          <textarea
            placeholder={field.placeholder || "Enter text..."}
            rows={3}
            className="w-full px-3 py-2 border border-primary rounded-md resize-none placeholder-primary"
            disabled
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            placeholder={field.placeholder || 'Enter email...'}
            className="w-full px-3 py-2 border border-primary rounded-md placeholder-primary"
            disabled
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            min={field.min}
            max={field.max}
            placeholder={field.placeholder || 'Enter number...'}
            className="w-full px-3 py-2 border border-primary rounded-md placeholder-primary"
            disabled
          />
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  disabled
                />
                <span className="label-light">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`radio-${field.id}`}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  disabled
                />
                <span className="label-light">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'dropdown':
        return (
          <select
            className="w-full label-light px-3 py-2 border border-primary rounded-md"
            disabled
          >
            <option value="">Select an option...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'nps':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
            </div>
            <div className="flex justify-between gap-1">
              {Array.from({ length: (field.max || 10) - (field.min || 0) + 1 }, (_, i) => (
                <button
                  key={i}
                  className="w-8 h-8 border border-primary rounded hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  {(field.min || 0) + i}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'date':
        return <input type="date" className="w-full px-3 py-2 label-light border border-primary rounded-md" disabled />;
      case 'time':
        return <input type="time" className="w-full px-3 py-2 border border-primary rounded-md" disabled />;
      case 'file':
        return <input type="file" className="w-full label-light px-3 py-2 border border-primary rounded-md" disabled />;
      case 'phone':
        return <input type="tel" className="w-full px-3 py-2 border border-primary rounded-md" placeholder="(555) 555-5555" disabled />;
      case 'url':
        return <input type="url" className="w-full px-3 py-2 border border-primary rounded-md" placeholder="https://example.com" disabled />;
      case 'rating':
        return (
          <Rate 
            disabled
            count={field.count || 5}
            allowHalf={field.allowHalf}
            defaultValue={field.defaultValue || 0}
          />
        );
      
      default:
        return <div className="text-gray-500">Unknown field type</div>;
    }
  };

  return (
    <div
      className={`p-2 px-3 rounded-lg cursor-pointer ${
        isSelected ? " bg-blue-50" : " bg-white"
      }`}
      onClick={onSelect}
    >
      <div className="mb-2">
        <label className="block text-sm font-medium text-primary mb-1">
          {field.label ? (
            field.label
          ) : (
            <span className="label-light">Untitled Field</span>
          )}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.helpText && (
          <p className="text-xs label-light mb-2">{field.helpText}</p>
        )}
      </div>
      {renderField()}
    </div>
  );
}