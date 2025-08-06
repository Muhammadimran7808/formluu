'use client';

import { useDrop } from 'react-dnd';
import { FormField as FormFieldType } from '@/types/form';
import FormField from './form-field';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import { Input, Modal, Tooltip } from "antd";
import { JSX, useState } from 'react';
import { AVAILABLE_FIELDS } from './available-fields';

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
  const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);

  // Helper: get field meta by type
  const getFieldMeta = (type: string) => {
    return AVAILABLE_FIELDS.find(f => f.type === type);
  };

  // Add descriptions and example previews for each field type
  const FIELD_DESCRIPTIONS: Record<string, { desc: string; example: JSX.Element }> = {
    'short-text': {
      desc: 'Use this to insert a question combined with a short text answer. Add an answer label or placeholder text for guidance.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">What is your first name?</div>
          <input className="border rounded px-3 py-2 w-full" placeholder="Short answer" />
        </div>
      ),
    },
    'long-text': {
      desc: 'Use this for longer, paragraph-style answers.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">Tell us about yourself</div>
          <textarea className="border rounded px-3 py-2 w-full" placeholder="Long answer" />
        </div>
      ),
    },
    'email': {
      desc: 'Collect a valid email address from the user.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">Your email address</div>
          <input type="email" className="border rounded px-3 py-2 w-full" placeholder="example@email.com" />
        </div>
      ),
    },
    'number': {
      desc: 'Collect a numeric answer, such as age or quantity.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">How many years of experience?</div>
          <input type="number" className="border rounded px-3 py-2 w-full" placeholder="0" />
        </div>
      ),
    },
    'checkbox': {
      desc: 'Allow users to select one or more options.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">Select your hobbies</div>
          <label className="flex items-center gap-2"><input type="checkbox" /> Reading</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Sports</label>
        </div>
      ),
    },
    'radio': {
      desc: 'Allow users to select a single option from a list.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">Choose your gender</div>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Female</label>
        </div>
      ),
    },
    'dropdown': {
      desc: 'Let users pick one option from a dropdown menu.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">Select your country</div>
          <select className="border rounded px-3 py-2 w-full"><option>USA</option><option>Canada</option></select>
        </div>
      ),
    },
    'nps': {
      desc: 'Collect a Net Promoter Score (0-10) from users.',
      example: (
        <div>
          <div className="text-gray-700 font-semibold mb-1">How likely are you to recommend us?</div>
          <input type="range" min="0" max="10" className="w-full" />
        </div>
      ),
    },
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD',
    drop: (item: { type: string }) => {
      onFieldAdd(item.type);
    },
    collect: (monitor: any) => ({
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
          <div className="space-y-4">
            <div className="mb-4">
              <Input
                type="text"
                placeholder={"Form title"}
                variant="borderless"
                className="w-full px-3 py-2 placeholder:text-[#bbbab8] font-bold !text-4xl"
              />
            </div>
            {fields.map((field) => (
              <div key={field.id} className="mx-auto group flex gap-4">
                {/* action buttons */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
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
                      onClick={() => setOpen(true)}
                      className="w-6 h-6 text-[#898884] hover:text-black hover:bg-[#0000000a] rounded-lg"
                    >
                      <PlusOutlined />
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
            {/* Add button at the end of the form */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <PlusOutlined /> Add Field
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for selecting form element */}
      <Modal
        open={open !== false}
        onCancel={() => {
          setOpen(false);
          setSelectedFieldType(null);
        }}
        width={700}
        footer={null}
        title={null}
        styles={{content: {padding: 8}}}
      >
        <div className="flex h-[400px]">
          {/* Left: List of fields */}
          <div className="w-1/3 border-r bg-gray-50 overflow-y-auto">
            <div className="p-2">
              <div className="font-semibold text-gray-700 mb-2">Questions</div>
              <div className="flex flex-col gap-1">
                {AVAILABLE_FIELDS.map((field) => (
                  <div
                    key={field.type}
                    className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-all
                  ${
                    selectedFieldType === field.type
                      ? "bg-white border-l-4 border-blue-500 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                    onClick={() => setSelectedFieldType(field.type)}
                    onDoubleClick={() => {
                      onFieldAdd(field.type);
                      setOpen(false);
                      setSelectedFieldType(null);
                    }}
                  >
                    <span className="text-xl">{field.icon}</span>
                    <span>{field.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Details/preview/insert */}
          <div className="flex-1 p-6 flex flex-col">
            {selectedFieldType ? (
              <>
                <div className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">
                    {getFieldMeta(selectedFieldType)?.icon}
                  </span>
                  {getFieldMeta(selectedFieldType)?.label}
                </div>
                <div className="text-gray-600 mb-4">
                  {FIELD_DESCRIPTIONS[selectedFieldType]?.desc}
                </div>
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Example</div>
                  <div className="bg-gray-100 p-3 rounded">
                    {FIELD_DESCRIPTIONS[selectedFieldType]?.example}
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold w-full"
                    onClick={() => {
                      onFieldAdd(selectedFieldType);
                      setOpen(false);
                      setSelectedFieldType(null);
                    }}
                  >
                    Insert
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <span className="text-6xl mb-2">📝</span>
                <div className="text-lg">
                  Select a field type to see details
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
} 