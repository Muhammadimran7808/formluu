'use client';

import { FormField as FormFieldType } from '@/types/form';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Rate, Image } from 'antd';
import { FormStyle } from './FormConfigSidebar';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: FormFieldType[];
  title: string;
  submitButtonText: string;
  formStyle: FormStyle;
}

export default function PreviewModal({ isOpen, onClose, fields, title, submitButtonText, formStyle }: PreviewModalProps) {
  if (!isOpen) return null;

  const renderPreviewField = (field: FormFieldType) => {
    switch (field.type) {
      case 'short-text':
        return (
          <input
            type="text"
            required={field.required}
            placeholder={field.placeholder || "Enter text..."}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#9b9b9b]"
          />
        );
      
      case 'long-text':
        return (
          <textarea
            placeholder={field.placeholder || "Enter text..."}
            required={field.required}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-[#9b9b9b]"
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            required={field.required}
            placeholder={field.placeholder || "Enter email..."}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#9b9b9b]"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            min={field.min}
            max={field.max}
            required={field.required}
            placeholder={field.placeholder || "Enter number..."}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#9b9b9b]"
          />
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required={field.required}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
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
                  required={field.required}
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
          <select
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="flex justify-between gap-1">
              {Array.from({ length: (field.max || 10) - (field.min || 0) + 1 }, (_, i) => (
                <button
                  type='button'
                  key={i}
                  className="w-8 h-8 border border-gray-300 text-black rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(field.min || 0) + i}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'date':
        return <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />;
      case 'time':
        return <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md" />;
      case 'file':
        return <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md" />;
      case 'phone':
        return <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="(555) 555-5555" />;
      case 'url':
        return <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://example.com" />;
      case 'rating':
        return (
          <Rate
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Form Preview
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className="p-6"
          style={{
            background: formStyle.bgColor,
            color: formStyle.textColor,
            fontFamily: formStyle.font,
          }}
        >
          {formStyle.coverImage && (
            <div className="w-full h-48 md:h-64 relative mb-14">
              <Image
                src={formStyle.coverImage}
                alt="Cover"
                width={"100%"}
                height={"100%"}
                className="object-cover"
                preview={false}
              />
              {formStyle.logo && (
                <div className="absolute h-20 w-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full shadow-lg overflow-hidden">
                  <Image
                    src={formStyle.logo}
                    alt="Logo"
                    className="!h-full !w-full object-contain"
                    preview={false}
                  />
                </div>
              )}
            </div>
          )}
          {formStyle.logo && !formStyle.coverImage && (
            <div className="flex justify-center mb-6">
              <Image
                src={formStyle.logo}
                alt="Logo"
                className="!h-16 object-contain"
                preview={false}
              />
            </div>
          )}
          {title && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center" style={{ color: formStyle.textColor }}>
                {title}
              </h1>
            </div>
          )}
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
                    {field.label || "Untitled Field"}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {field.helpText && (
                    <p className="text-xs text-gray-500">{field.helpText}</p>
                  )}
                  {renderPreviewField(field)}
                </div>
              ))}

              <div className="pt-4">
                <Button 
                  className="!h-9 !font-bold focus:!border-0"
                  style={{
                    backgroundColor: formStyle.buttonBgColor,
                    color: formStyle.buttonTextColor,
                  }}
                >
                  {submitButtonText || "Submit"} <ArrowRightOutlined />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}