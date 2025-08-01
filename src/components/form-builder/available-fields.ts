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
    label: 'Checkbox',
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
  }
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
    default:
      return baseConfig;
  }
}; 