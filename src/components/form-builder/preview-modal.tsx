'use client';

import { FormField as FormFieldType } from '@/types/form';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: FormFieldType[];
}

export default function PreviewModal({ isOpen, onClose, fields }: PreviewModalProps) {
  if (!isOpen) return null;

  const renderPreviewField = (field: FormFieldType) => {
    switch (field.type) {
      case 'short-text':
        return (
          <input
            type="text"
            placeholder={field.placeholder || 'Enter text...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'long-text':
        return (
          <textarea
            placeholder={field.placeholder || 'Enter text...'}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            placeholder={field.placeholder || 'Enter email...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            min={field.min}
            max={field.max}
            placeholder={field.placeholder || 'Enter number...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                />
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        );
      
      case 'dropdown':
        return (
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                  className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Form Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {fields.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-4">📝</div>
              <p>No fields added yet. Add some fields to see the preview.</p>
            </div>
          ) : (
            <form className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label || 'Untitled Field'}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.helpText && (
                    <p className="text-xs text-gray-500">{field.helpText}</p>
                  )}
                  {renderPreviewField(field)}
                </div>
              ))}
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Submit Form
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 