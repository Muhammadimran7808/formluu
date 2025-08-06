import { Modal } from "antd";
import { AVAILABLE_FIELDS } from './available-fields';
import React, { JSX } from 'react';

interface FieldPickerModalProps {
  open: boolean;
  onClose: () => void;
  onFieldAdd: (fieldType: string) => void;
  selectedFieldType: string | null;
  setSelectedFieldType: (type: string | null) => void;
}

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
  'date': {
    desc: 'Let users pick a date from a calendar.',
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Pick a date</div>
        <input type="date" className="border rounded px-3 py-2 w-full" disabled />
      </div>
    ),
  },
  'time': {
    desc: 'Let users select a time.',
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Pick a time</div>
        <input type="time" className="border rounded px-3 py-2 w-full" disabled />
      </div>
    ),
  },
  'file': {
    desc: 'Allow users to upload a file.',
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Upload a file</div>
        <input type="file" className="border rounded px-3 py-2 w-full" disabled />
      </div>
    ),
  },
  'phone': {
    desc: 'Collect a phone number from the user.',
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Phone number</div>
        <input type="tel" className="border rounded px-3 py-2 w-full" placeholder="(555) 555-5555" disabled />
      </div>
    ),
  },
  'url': {
    desc: 'Collect a website or URL from the user.',
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Website</div>
        <input type="url" className="border rounded px-3 py-2 w-full" placeholder="https://example.com" disabled />
      </div>
    ),
  },
  'rating': {
    desc: 'Let users rate something with stars.',
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Rate your experience</div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-2xl">★</span>
          ))}
        </div>
      </div>
    ),
  },
};

const getFieldMeta = (type: string) => AVAILABLE_FIELDS.find(f => f.type === type);

const FieldPickerModal: React.FC<FieldPickerModalProps> = ({
  open,
  onClose,
  onFieldAdd,
  selectedFieldType,
  setSelectedFieldType,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={750}
      footer={null}
      title={null}
      styles={{ content: { padding: 8 } }}
    >
      <div className="flex h-[550px] overflow-y-auto">
        {/* Left: List of fields */}
        <div className="w-1/4 border-r border-r-gray-300 bg-gray-50 overflow-y-auto">
          <div className="p-2">
            <div className="font-semibold text-gray-700 mb-2">Questions</div>
            <div className="flex flex-col gap-1">
              {AVAILABLE_FIELDS.map((field) => (
                <div
                  key={field.type}
                  className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-all select-none
                    ${selectedFieldType === field.type ? 'bg-white border-l-4 border-blue-500 font-bold' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedFieldType(field.type)}
                  onDoubleClick={() => {
                    onFieldAdd(field.type);
                    onClose();
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
                <span className="text-2xl">{getFieldMeta(selectedFieldType)?.icon}</span>
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
                    onClose();
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
              <div className="text-lg">Select a field type to see details</div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FieldPickerModal; 