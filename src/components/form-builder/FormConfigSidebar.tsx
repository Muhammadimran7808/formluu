import React from 'react';
import { Select, Upload, Button } from 'antd';
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

export default function FormConfigSidebar({ open, onClose, formStyle, setFormStyle }: FormConfigSidebarProps) {
  if (!open) return null;

  const handleColorChange = (key: keyof FormStyle, color: any) => {
    setFormStyle({ ...formStyle, [key]: color.hex });
  };

  const handleFontChange = (font: string) => {
    setFormStyle({ ...formStyle, font });
  };

  const handleUpload = (key: 'logo' | 'coverImage', info: any) => {
    if (info.file.status === 'done' || info.file.originFileObj) {
      const file = info.file.originFileObj || info.file;
      const reader = new FileReader();
      reader.onload = e => {
        setFormStyle({ ...formStyle, [key]: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={sidebarClass}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Form Style</h2>
        <Button type="text" onClick={onClose}>&times;</Button>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
          <SketchPicker
            color={formStyle.bgColor}
            onChange={color => handleColorChange('bgColor', color)}
            presetColors={["#ffffff", "#f3f4f6", "#f9fafb", "#222222", "#000000", "#e5e7eb", "#fbbf24", "#3b82f6"]}
            disableAlpha
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
          <SketchPicker
            color={formStyle.textColor}
            onChange={color => handleColorChange('textColor', color)}
            presetColors={["#222222", "#000000", "#ffffff", "#fbbf24", "#3b82f6", "#ef4444"]}
            disableAlpha
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
          <Select
            value={formStyle.font}
            onChange={handleFontChange}
            options={FONT_OPTIONS}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Background</label>
          <SketchPicker
            color={formStyle.buttonBgColor}
            onChange={color => handleColorChange('buttonBgColor', color)}
            presetColors={["#000000", "#3b82f6", "#fbbf24", "#ef4444", "#10b981"]}
            disableAlpha
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text Color</label>
          <SketchPicker
            color={formStyle.buttonTextColor}
            onChange={color => handleColorChange('buttonTextColor', color)}
            presetColors={["#ffffff", "#000000", "#fbbf24", "#3b82f6", "#ef4444"]}
            disableAlpha
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
            <img src={formStyle.logo} alt="Logo" className="mt-2 h-12 object-contain" />
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
            <img src={formStyle.coverImage} alt="Cover" className="mt-2 w-full h-24 object-cover rounded" />
          )}
        </div>
      </div>
    </div>
  );
} 