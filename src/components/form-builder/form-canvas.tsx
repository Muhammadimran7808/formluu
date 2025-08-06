'use client';

import { useDrag, useDrop } from 'react-dnd';
import { FieldType, FormField as FormFieldType } from '@/types/form';
import FormField from './form-field';
import { DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { useState } from 'react';
import FieldPickerModal from './field-picker-modal';
import DragIcon from '@/icons/drag';
import React from 'react';

interface FormCanvasProps {
  fields: FormFieldType[];
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldAdd: (fieldType: FieldType, insertIndex?: number) => void;
  onFieldRemove: (fieldId: string) => void;
  onFieldMove: (from: number, to: number) => void;
}

const ItemType = 'FORM_FIELD';

function DraggableFormField({
  field,
  index,
  moveField,
  children,
}: {
  field: FormFieldType;
  index: number;
  moveField: (from: number, to: number) => void;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      // Only move when the mouse has crossed half of the item's height
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>{children}</div>
  );
}

export default function FormCanvas({
  fields,
  selectedFieldId,
  onFieldSelect,
  onFieldAdd,
  onFieldRemove,
  onFieldMove,
}: FormCanvasProps) {
  const [open, setOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mx-auto">

        <div
          className={`
            min-h-[600px] bg-white rounded-lg border-2 border-dashed p-6
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
            {fields.map((field, idx) => (
              <DraggableFormField
                key={field.id}
                field={field}
                index={idx}
                moveField={onFieldMove}
              >
                <div className="mx-auto group flex gap-4">
                  {/* action buttons */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Tooltip title="Click to delete this block">
                      <button
                        onClick={() => onFieldRemove(field.id)}
                        className=" w-6 h-6 cursor-pointer text-[#898884] hover:text-black hover:bg-[#0000000a] rounded-lg"
                      >
                        <DeleteOutlined className="text-[#9b9b9b]" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Click to insert block below">
                      <button
                        onClick={() => { setOpen(true); setInsertIndex(idx + 1); }}
                        className="w-6 h-6 cursor-pointer text-[#898884] hover:text-black hover:bg-[#0000000a] rounded-lg"
                      >
                        <PlusOutlined />
                      </button>
                    </Tooltip>
                    <Tooltip title="Drag to move">
                      <button
                        className="flex items-center justify-center w-6 h-6 cursor-pointer hover:bg-[#0000000a] rounded-lg"
                        ref={drag => {
                          // Only the drag handle is draggable
                          if (drag) drag;
                        }}
                        style={{ cursor: 'grab' }}
                        tabIndex={-1}
                        aria-label="Drag to reorder"
                      >
                        <DragIcon />
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
              </DraggableFormField>
            ))}
            {/* Add button at the end of the form */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => { setOpen(true); setInsertIndex(null); }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <PlusOutlined /> Add Field
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Field Picker Modal */}
      <FieldPickerModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedFieldType(null);
          setInsertIndex(null);
        }}
        onFieldAdd={(type) => {
          onFieldAdd(type as FieldType, insertIndex ?? undefined);
          setOpen(false);
          setSelectedFieldType(null);
          setInsertIndex(null);
        }}
        selectedFieldType={selectedFieldType}
        setSelectedFieldType={setSelectedFieldType}
      />
    </div>
  );
} 