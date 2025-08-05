'use client';

import { useDrop } from 'react-dnd';
import { FormField as FormFieldType } from '@/types/form';
import FormField from './form-field';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);
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
      <div className="mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Form Builder
          </h1>
          <p className="text-gray-600">
            Drag and drop elements to create your form
          </p>
        </div>

        <div
          ref={drop}
          className={`
            min-h-[600px] bg-white rounded-lg border-2 border-dashed p-6
            ${isOver ? "border-blue-400" : "border-gray-300"}
            transition-all duration-200
          `}
        >
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium mb-2">
                Start building your form
              </h3>
              <p className="text-sm">Drag form elements from the left panel</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="mx-auto group flex gap-4">
                  {/* action buttons */}
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             flex items-center justify-center"
                  >
                    <Tooltip title="Click to delete this block">
                      <button
                        onClick={() => onFieldRemove(field.id)}
                        className=" w-6 h-6 text-[#898884] hover:text-black hover:bg-[#0000000a] rounded-lg"
                      >
                        <DeleteOutlined className="text-[#9b9b9b]" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Click to insert block below">
                      <button
                        onClick={()=> setOpen(true)}
                        className="w-6 h-6 text-[#898884] hover:text-black hover:bg-[#0000000a] rounded-lg"
                      >
                        <PlusOutlined />
                      </button>
                    </Tooltip>
                    <Tooltip title="Drag to move">
                      <button
                        onClick={() => onFieldRemove(field.id)}
                        className=" w-6 h-6 text-[#898884] hover:text-black hover:bg-[#0000000a] rounded-lg"
                      >
                        <DeleteOutlined className="text-[#9b9b9b]" />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="flex-1">
                    <FormField
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onSelect={() => onFieldSelect(field.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal open={open} onCancel={()=> setOpen(false)} width={600} footer={null}>
          <div>ieiieh</div>
      </Modal>
    </div>
  );
} 