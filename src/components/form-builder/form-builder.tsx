'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormField as FormFieldType, FieldConfig } from '@/types/form';
import { getDefaultFieldConfig } from './available-fields';
import FieldsPanel from './fields-panel';
import FormCanvas from './form-canvas';
import ConfigPanel from './config-panel';
import PreviewModal from './preview-modal';

export default function FormBuilder() {
  const [fields, setFields] = useState<FormFieldType[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addField = (fieldType: string) => {
    const newField: FormFieldType = {
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: fieldType as any,
      label: '',
      placeholder: '',
      helpText: '',
      required: false,
      ...getDefaultFieldConfig(fieldType),
    };

    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const updateField = (fieldId: string, config: Partial<FieldConfig>) => {
    setFields(fields.map(field => 
      field.id === fieldId 
        ? { ...field, ...config }
        : field
    ));
  };

  const removeField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const selectedField = fields.find(field => field.id === selectedFieldId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-gray-100">
        {/* Left Panel - Available Fields */}
        <FieldsPanel />

        {/* Middle Panel - Form Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Formluu</h1>
                <p className="text-gray-600">Build beautiful forms with ease</p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Preview Form
              </button>
            </div>
          </div>

          {/* Canvas */}
          <FormCanvas
            fields={fields}
            selectedFieldId={selectedFieldId}
            onFieldSelect={setSelectedFieldId}
            onFieldAdd={addField}
            onFieldRemove={removeField}
          />
        </div>

        {/* Right Panel - Configuration */}
        <ConfigPanel
          selectedField={selectedField}
          onFieldUpdate={updateField}
        />
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        fields={fields}
      />
    </DndProvider>
  );
} 