export type FieldType = 
  | 'form-title'
  | 'short-text'
  | 'long-text'
  | 'email'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'nps'
  | 'submit-button'
  | 'date'
  | 'time'
  | 'file'
  | 'phone'
  | 'url'
  | 'rating';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  count?: number;
  allowHalf?: boolean;
  defaultValue?: number;
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FieldConfig {
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  count?: number;
  allowHalf?: boolean;
  defaultValue?: number;
}

export interface DraggableField {
  type: FieldType;
  label: string;
  icon: string;
}