import React, { useState } from 'react';
import { Select, Upload, Button, Input, Popover, Image } from 'antd';
import { SketchPicker } from 'react-color';
import { UploadOutlined } from '@ant-design/icons';

const FONT_OPTIONS = [
  { label: 'Cursive', value: 'cursive' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Monospace', value: 'monospace' },
  { label: 'Revert', value: 'revert' },
  { label: 'Serif', value: 'serif' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Montserrat', value: 'Montserrat' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Poppins', value: 'Poppins' },
];

export interface FormStyle {
  bgColor: string;
  textColor: string;
  font: string;
  buttonBgColor: string;
  buttonTextColor: string;
  logo?: string;
  coverImage?: string;
}

interface FormConfigSidebarProps {
  open: boolean;
  onClose: () => void;
  formStyle: FormStyle;
  setFormStyle: (style: FormStyle) => void;
}

const sidebarClass =
  'w-80 bg-gray-50 border-l border-gray-200 p-4 h-screen overflow-y-auto';

interface ColorInputProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

function ColorInput({ label, color, onChange }: ColorInputProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <Popover
      open={isPickerOpen}
      onOpenChange={setIsPickerOpen}
      trigger="click"
      styles={{ body: { padding: 0 } }}
      content={
        <SketchPicker
          color={color}
          onChange={(color) => onChange(color.hex)}
          presetColors={[
            "#ffffff",
            "#f3f4f6",
            "#f9fafb",
            "#222222",
            "#000000",
            "#e5e7eb",
            "#fbbf24",
            "#3b82f6",
          ]}
          disableAlpha
        />
      }
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px, rgba(61, 59, 53, 0.08) 0px 2px 5px 0px",
        }}
        className="flex h-[28px] rounded-lg px-2 py-1 shadow-2xl items-center gap-2"
      >
        <div
          className="w-5 h-5 rounded border border-[#37352f17] cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setIsPickerOpen(true)}
        />
        <Input
          type="text"
          value={color}
          variant="borderless"
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 max-w-[120px] px-3 py-2"
          placeholder="#000000"
        />
      </div>
    </Popover>
  );
}

export default function FormConfigSidebar({ open, onClose, formStyle, setFormStyle }: FormConfigSidebarProps) {
  if (!open) return null;

  const handleColorChange = (key: keyof FormStyle, color: string) => {
    setFormStyle({ ...formStyle, [key]: color });
  };

  const handleFontChange = (font: string) => {
    setFormStyle({ ...formStyle, font });
  };

  const handleUpload = (key: 'logo' | 'coverImage', info: any) => {
    const file = info.file.originFileObj || info.file;
    const reader = new FileReader();
    reader.onload = e => {
      setFormStyle({ ...formStyle, [key]: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={sidebarClass}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Form Style</h2>
        <Button type="text" onClick={onClose}>&times;</Button>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
          <Select
            value={formStyle.font}
            onChange={handleFontChange}
            options={FONT_OPTIONS}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ColorInput
            label="Background"
            color={formStyle.bgColor}
            onChange={(color) => handleColorChange('bgColor', color)}
          />
          <ColorInput
            label="Text"
            color={formStyle.textColor}
            onChange={(color) => handleColorChange('textColor', color)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ColorInput
            label="Button background"
            color={formStyle.buttonBgColor}
            onChange={(color) => handleColorChange('buttonBgColor', color)}
          />
          <ColorInput
            label="Button text"
            color={formStyle.buttonTextColor}
            onChange={(color) => handleColorChange('buttonTextColor', color)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={info => handleUpload('logo', info)}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Logo</Button>
          </Upload>
          {formStyle.logo && (
            <Image
              src={formStyle.logo}
              alt="Logo"
              className="!h-12 object-contain"
              preview={false}
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={info => handleUpload('coverImage', info)}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Cover</Button>
          </Upload>
          {formStyle.coverImage && (
            <Image
              src={formStyle.coverImage}
              alt="Cover"
              className="mt-2 w-full !h-24 object-cover rounded"
              preview={false}
            />
          )}
        </div>
      </div>
    </div>
  );
} 