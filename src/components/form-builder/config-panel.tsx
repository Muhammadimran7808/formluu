'use client';

import { FormField as FormFieldType, FieldConfig } from '@/types/form';

interface ConfigPanelProps {
  selectedField: FormFieldType | null;
  onFieldUpdate: (fieldId: string, config: Partial<FieldConfig>) => void;
}

export default function ConfigPanel({ selectedField, onFieldUpdate }: ConfigPanelProps) {
  if (!selectedField) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <div className="text-center text-gray-500 mt-8">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-lg font-medium mb-2">Field Configuration</h3>
          <p className="text-sm">Select a field to configure its properties</p>
        </div>
      </div>
    );
  }

  const handleConfigChange = (key: keyof FieldConfig, value: any) => {
    onFieldUpdate(selectedField.id, { [key]: value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(selectedField.options || [])];
    newOptions[index] = value;
    handleConfigChange('options', newOptions);
  };

  const addOption = () => {
    const newOptions = [...(selectedField.options || []), `Option ${(selectedField.options?.length || 0) + 1}`];
    handleConfigChange('options', newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = selectedField.options?.filter((_, i) => i !== index) || [];
    handleConfigChange('options', newOptions);
  };

  const isOptionsField = selectedField?.type === 'radio' || selectedField?.type === 'dropdown' || selectedField?.type === 'checkbox';

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Field Configuration</h2>
        <p className="text-sm text-gray-600">Configure the selected field</p>
      </div>

      <div className="space-y-4">
        {/* Field Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
          <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-600">
            {selectedField.type.charAt(0).toUpperCase() + selectedField.type.slice(1).replace('-', ' ')}
          </div>
        </div>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={selectedField.label}
            onChange={(e) => handleConfigChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-[#9b9b9b]"
            placeholder="Enter field label"
          />
        </div>

        {/* Placeholder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
          <input
            type="text"
            value={selectedField.placeholder || ''}
            onChange={(e) => handleConfigChange('placeholder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-[#9b9b9b]"
            placeholder="Enter placeholder text"
          />
        </div>

        {/* Help Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Help Text</label>
          <textarea
            value={selectedField.helpText || ''}
            onChange={(e) => handleConfigChange('helpText', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 placeholder:text-[#9b9b9b]"
            placeholder="Enter help text"
          />
        </div>

        {/* Required Toggle */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedField.required}
              onChange={(e) => handleConfigChange('required', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Required field</span>
          </label>
        </div>

        {/* Options for Radio/Dropdown */}
        {isOptionsField && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            <div className="space-y-2">
              {selectedField.options?.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-[#9b9b9b]"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-md"
                    title="Remove option"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addOption}
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                + Add Option
              </button>
            </div>
          </div>
        )}

        {/* Min/Max for Number/NPS */}
        {(selectedField.type === 'number' || selectedField.type === 'nps') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Value</label>
              <input
                type="number"
                value={selectedField.min || 0}
                onChange={(e) => handleConfigChange('min', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-[#9b9b9b]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Value</label>
              <input
                type="number"
                value={selectedField.max || 100}
                onChange={(e) => handleConfigChange('max', parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder:text-[#9b9b9b]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 