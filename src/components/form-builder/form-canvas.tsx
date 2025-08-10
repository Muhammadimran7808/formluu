'use client';

import { useDrag, useDrop } from 'react-dnd';
import { FieldType, FormField as FormFieldType } from '@/types/form';
import FormField from './form-field';
import { ArrowRightOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Tooltip, Image } from "antd";
import { useState } from 'react';
import FieldPickerModal from './field-picker-modal';
import DragIcon from '@/icons/drag';
import React from 'react';
import { FormStyle } from './FormConfigSidebar';

interface FormCanvasProps {
  fields: FormFieldType[];
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldAdd: (fieldType: FieldType, insertIndex?: number) => void;
  onFieldRemove: (fieldId: string) => void;
  onFieldMove: (from: number, to: number) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  submitButtonText: string;
  setSubmitButtonText: React.Dispatch<React.SetStateAction<string>>;
  onOpenFormConfigSidebar: () => void;
  closeFromConfigModal: () => void;
  formStyle: FormStyle;
}

const ItemType = 'FORM_FIELD';

function DraggableFormField({
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
  title,
  setTitle,
  submitButtonText,
  setSubmitButtonText,
  onOpenFormConfigSidebar,
  closeFromConfigModal,
  formStyle,
}: FormCanvasProps) {
  const [open, setOpen] = useState(false);
  const [showSubmitTextPopover, setShowSubmitTextPopover] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 p-6 mb-7">
      <div className="mx-auto">
        <div
          className={`min-h-[600px] rounded-lg transition-all duration-200 relative overflow-hidden`}
          style={{
            background: formStyle.bgColor,
            color: formStyle.textColor,
            fontFamily: formStyle.font,
          }}
        >
          {formStyle.coverImage && (
            <div className="w-full h-48 md:h-64 relative">
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
            <div className="flex justify-center mb-4 mt-4">
              <Image
                src={formStyle.logo}
                alt="Logo"
                className="!h-16 object-contain"
                preview={false}
              />
            </div>
          )}
          <div className="flex flex-col space-y-4 max-w-xl mx-auto mt-10">
            <div className="ml-[88px] relative group/title">
              <Input
                type="text"
                placeholder={"Form title"}
                variant="borderless"
                className="w-full text-primary h-14 px-3 py-2 placeholder-primary font-bold !text-4xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/title:opacity-100 transition-opacity bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-100"
                onClick={onOpenFormConfigSidebar}
                tabIndex={-1}
                aria-label="Customize form style"
              >
                <SettingOutlined />
              </button>
            </div>
            {fields.map((field, idx) => (
              <DraggableFormField
                key={field.id}
                field={field}
                index={idx}
                moveField={onFieldMove}
              >
                <div className="group flex gap-4">
                  {/* action buttons */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Tooltip title="Click to delete this block">
                      <button
                        onClick={() => onFieldRemove(field.id)}
                        className="w-6 h-6 cursor-pointer text-primary-light hover:bg-[#0000000a] rounded-lg"
                      >
                        <DeleteOutlined />
                      </button>
                    </Tooltip>
                    <Tooltip title="Click to insert block below">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setInsertIndex(idx + 1);
                        }}
                        className="w-6 h-6 cursor-pointer text-primary-light hover:bg-[#0000000a] rounded-lg"
                      >
                        <PlusOutlined />
                      </button>
                    </Tooltip>
                    <Tooltip title="Drag to move">
                      <button
                        className="flex items-center justify-center w-6 h-6 cursor-pointer text-primary-light hover:bg-[#0000000a] rounded-lg"
                        ref={(drag) => {
                          // Only the drag handle is draggable
                          if (drag) drag;
                        }}
                        style={{ cursor: "grab" }}
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
                      onSelect={() => {
                        onFieldSelect(field.id);
                        closeFromConfigModal();
                      }}
                    />
                  </div>
                </div>
              </DraggableFormField>
            ))}
            {/* Add button at the end of the form */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  setOpen(true);
                  setInsertIndex(null);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-primary rounded-lg text-primary hover:bg-gray-100"
              >
                <PlusOutlined /> Add Field
              </button>
            </div>
            <div className="ml-[88px] flex items-center gap-2 group">
              <Popover
                open={showSubmitTextPopover}
                onOpenChange={setShowSubmitTextPopover}
                trigger="click"
                content={
                  <div className="flex flex-col gap-1 p-1 rounded-xl bg-white min-w-[220px]">
                    <label className="text-gray-700 font-semibold mb-1">
                      Button label
                    </label>
                    <Input
                      type="text"
                      placeholder={"Button label"}
                      className="rounded-lg px-2 py-2 placeholder:text-[#bbbab8] !text-lg border-2 border-[#e5e7eb] focus:!border-blue-400 focus:!shadow-none"
                      value={submitButtonText}
                      onChange={(e) => setSubmitButtonText(e.target.value)}
                      autoFocus
                    />
                  </div>
                }
              >
                <div className="flex gap-3">
                  <Tooltip title="Edit button label" placement="bottom">
                    <SettingOutlined className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Tooltip>
                  <Button
                    className="btn-bg-primary !h-9 btn-text-primary !font-bold focus:!border-0 flex items-center"
                    onClick={() => setShowSubmitTextPopover(true)}
                  >
                    {submitButtonText || "Submit"} <ArrowRightOutlined />
                  </Button>
                </div>
              </Popover>
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