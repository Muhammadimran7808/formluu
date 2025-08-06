'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormField as FormFieldType } from '@/types/form';
import { getDefaultFieldConfig } from './available-fields';
import FormCanvas from './form-canvas';
import ConfigPanel from './config-panel';
import PreviewModal from './preview-modal';
import { useFormStorage } from '@/hooks/useFormStorage';

export default function FormBuilder() {
  const { fields, setFields } = useFormStorage();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFieldAdd = (type: string, index?: number) => {
    const newField = {
      id: crypto.randomUUID(),
      type,
      ...getDefaultFieldConfig(type),
    };

    setFields(prev => {
      const newFields = [...prev];
      if (typeof index === 'number') {
        newFields.splice(index, 0, newField);
      } else {
        newFields.push(newField);
      }
      return newFields;
    });
    setSelectedFieldId(newField.id);
  };

  const handleFieldUpdate = (id: string, updates: Partial<FormFieldType>) => {
    setFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const handleFieldDelete = (id: string) => {
    setFields(prev => prev.filter(field => field.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  const handleFieldMove = (dragIndex: number, hoverIndex: number) => {
    setFields(prev => {
      const newFields = [...prev];
      const [draggedField] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);
      return newFields;
    });
  };

  const selectedField = fields.find(field => field.id === selectedFieldId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="px-6 flex bg-gray-100">

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
            onFieldAdd={handleFieldAdd}
            onFieldRemove={handleFieldDelete}
            onFieldMove={handleFieldMove}
          />
        </div>

        {/* Right Panel - Configuration */}
        <ConfigPanel
          selectedField={selectedField}
          onFieldUpdate={handleFieldUpdate}
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