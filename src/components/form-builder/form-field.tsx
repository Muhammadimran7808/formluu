'use client';

import { FormField as FormFieldType } from '@/types/form';
import React from 'react';

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#9b9b9b]"
            disabled
          />
        );
      
      case 'long-text':
        return (
          <textarea
            placeholder={field.placeholder || "Enter text..."}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-[#9b9b9b]"
            disabled
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            placeholder={field.placeholder || 'Enter email...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#9b9b9b]"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#9b9b9b]"
            disabled
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled
            />
            <span className="text-gray-700">Check this option</span>
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
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  disabled
                />
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'dropdown':
        return (
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled>
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
              <span>{field.min || 0}</span>
              <span>{field.max || 10}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: (field.max || 10) - (field.min || 0) + 1 }, (_, i) => (
                <button
                  key={i}
                  className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  {(field.min || 0) + i}
                </button>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div className="text-gray-500">Unknown field type</div>;
    }
  };

  return (
    <div
      className={`
        p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
      onClick={onSelect}
    >
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label ? (
            field.label
          ) : (
            <span className="text-[#9b9b9b]">Untitled Field</span>
          )}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.helpText && (
          <p className="text-xs text-gray-500 mb-2">{field.helpText}</p>
        )}
      </div>

      {renderField()}
    </div>
  );
} 