import { DraggableField } from '@/types/form';

export const AVAILABLE_FIELDS: DraggableField[] = [
  {
    type: 'short-text',
    label: 'Short Text',
    icon: '📝'
  },
  {
    type: 'long-text',
    label: 'Long Text',
    icon: '📄'
  },
  {
    type: 'email',
    label: 'Email',
    icon: '📧'
  },
  {
    type: 'number',
    label: 'Number',
    icon: '🔢'
  },
  {
    type: 'checkbox',
    label: 'Checkboxes',
    icon: '☑️'
  },
  {
    type: 'radio',
    label: 'Radio',
    icon: '🔘'
  },
  {
    type: 'dropdown',
    label: 'Dropdown',
    icon: '📋'
  },
  {
    type: 'nps',
    label: 'NPS',
    icon: '⭐'
  },
  // New field types
  {
    type: 'date',
    label: 'Date',
    icon: '📅'
  },
  {
    type: 'time',
    label: 'Time',
    icon: '⏰'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: '📁'
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: '📞'
  },
  {
    type: 'url',
    label: 'URL',
    icon: '🔗'
  },
  {
    type: 'rating',
    label: 'Rating',
    icon: '🌟'
  },
];

export const getDefaultFieldConfig = (type: string) => {
  const baseConfig = {
    label: '',
    placeholder: '',
    helpText: '',
    required: false,
  };

  switch (type) {
    case 'radio':
    case 'dropdown':
    case 'checkbox':
      return {
        ...baseConfig,
        options: ['Option 1', 'Option 2', 'Option 3']
      };
    case 'number':
      return {
        ...baseConfig,
        min: 0,
        max: 100
      };
    case 'nps':
      return {
        ...baseConfig,
        min: 0,
        max: 10
      };
    case 'rating':
      return {
        ...baseConfig,
        count: 5,
        allowHalf: false,
        defaultValue: 0
      };
    default:
      return baseConfig;
  }
};