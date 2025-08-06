import { Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AVAILABLE_FIELDS } from './available-fields';
import React, { JSX } from 'react';

interface FieldPickerModalProps {
  open: boolean;
  onClose: () => void;
  onFieldAdd: (fieldType: string) => void;
  selectedFieldType: string | null;
  setSelectedFieldType: (type: string | null) => void;
}

const FIELD_DESCRIPTIONS: Record<
  string,
  { desc: string; example: JSX.Element }
> = {
  "short-text": {
    desc: "Use this to insert a question combined with a short text answer. Add an answer label or placeholder text for guidance.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          What is your first name?
        </div>
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Short answer"
        />
      </div>
    ),
  },
  "long-text": {
    desc: "Use this for longer, paragraph-style answers.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          Tell us about yourself
        </div>
        <textarea
          className="border rounded px-3 py-2 w-full"
          placeholder="Long answer"
        />
      </div>
    ),
  },
  email: {
    desc: "Collect a valid email address from the user.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          Your email address
        </div>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          placeholder="example@email.com"
        />
      </div>
    ),
  },
  number: {
    desc: "Collect a numeric answer, such as age or quantity.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          How many years of experience?
        </div>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          placeholder="0"
        />
      </div>
    ),
  },
  checkbox: {
    desc: "Allow users to select one or more options.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          Select your hobbies
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Reading
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Sports
        </label>
      </div>
    ),
  },
  radio: {
    desc: "Allow users to select a single option from a list.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          Choose your gender
        </div>
        <label className="flex items-center gap-2">
          <input type="radio" name="gender" /> Male
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="gender" /> Female
        </label>
      </div>
    ),
  },
  dropdown: {
    desc: "Let users pick one option from a dropdown menu.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          Select your country
        </div>
        <select className="border rounded px-3 py-2 w-full">
          <option>USA</option>
          <option>Canada</option>
        </select>
      </div>
    ),
  },
  nps: {
    desc: "Collect a Net Promoter Score (0-10) from users.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          How likely are you to recommend us?
        </div>
        <div className="flex justify-between gap-1">
          {Array.from(
            { length: (10) - (0) + 1 },
            (_, i) => (
              <button
                type="button"
                key={i}
                className="w-8 h-8 border border-gray-300 text-black rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(0) + i}
              </button>
            )
          )}
        </div>
      </div>
    ),
  },
  date: {
    desc: "Let users pick a date from a calendar.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Pick a date</div>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          disabled
        />
      </div>
    ),
  },
  time: {
    desc: "Let users select a time.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Pick a time</div>
        <input
          type="time"
          className="border rounded px-3 py-2 w-full"
          disabled
        />
      </div>
    ),
  },
  file: {
    desc: "Allow users to upload a file.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Upload a file</div>
        <input
          type="file"
          className="border rounded px-3 py-2 w-full"
          disabled
        />
      </div>
    ),
  },
  phone: {
    desc: "Collect a phone number from the user.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Phone number</div>
        <input
          type="tel"
          className="border rounded px-3 py-2 w-full"
          placeholder="(555) 555-5555"
          disabled
        />
      </div>
    ),
  },
  url: {
    desc: "Collect a website or URL from the user.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">Website</div>
        <input
          type="url"
          className="border rounded px-3 py-2 w-full"
          placeholder="https://example.com"
          disabled
        />
      </div>
    ),
  },
  rating: {
    desc: "Let users rate something with stars.",
    example: (
      <div>
        <div className="text-gray-700 font-semibold mb-1">
          Rate your experience
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-2xl">
              ★
            </span>
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listContainerRef = React.useRef<HTMLDivElement>(null);
  const selectedItemRef = React.useRef<HTMLDivElement>(null);

  // Filter fields based on search query
  const filteredFields = AVAILABLE_FIELDS.filter(field =>
    field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus container when modal opens - removed auto selection
  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        containerRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Scroll selected item into view when it changes
  React.useEffect(() => {
    if (selectedItemRef.current && listContainerRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedFieldType]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = filteredFields.findIndex(f => f.type === selectedFieldType);

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          setSelectedFieldType(filteredFields[currentIndex - 1].type);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < filteredFields.length - 1) {
          setSelectedFieldType(filteredFields[currentIndex + 1].type);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedFieldType) {
          onFieldAdd(selectedFieldType);
          onClose();
          setSelectedFieldType(null);
        }
        break;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={750}
      footer={null}
      title={null}
      closeIcon={false}
      styles={{ content: { padding: 0 } }}
    >
      <div 
        className="flex h-[550px] outline-none"
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Search bar - now with icon and clean styling */}
        <div className="absolute top-0 left-0 right-0 z-10 px-1.5 py-1 border-b border-gray-200">
          <div className="relative">
            <SearchOutlined className="absolute left-0 top-1/2 -translate-y-1/2 ml-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 text-gray-800 outline-none"
              placeholder="Search fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex w-full mt-[60px]">
          {/* Left: List of fields */}
          <div className="w-1/4 border-r border-r-gray-300 bg-gray-50 overflow-y-auto" ref={listContainerRef}>
            <div className="flex flex-col gap-1 p-2">
              {filteredFields.map((field) => (
                <div
                  key={field.type}
                  ref={field.type === selectedFieldType ? selectedItemRef : null}
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
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="text-center space-y-2">
                  <p>
                    Search for any input field or layout option. Use{' '}
                    <span className="inline-flex items-center border border-gray-300 rounded px-2 font-medium text-sm mx-1">↑</span>
                    {' '}and{' '}
                    <span className="inline-flex items-center border border-gray-300 rounded px-2 font-medium text-sm mx-1">↓</span>
                    {' '}to browse the list, then hit{' '}
                    <span className="inline-flex items-center border border-gray-300 rounded px-2 font-medium text-sm mx-1">↵</span>
                    {' '}to insert the selected block.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FieldPickerModal;