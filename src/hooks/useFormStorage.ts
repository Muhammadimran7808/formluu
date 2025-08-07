import { FormField } from '@/types/form';
import { useState, useEffect } from 'react';

interface FormStyle {
  bgColor: string;
  textColor: string;
  font: string;
  buttonBgColor: string;
  buttonTextColor: string;
  logo?: string;
  coverImage?: string;
}

interface StoredForm {
  lastModified: number;
  fields: FormField[];
  title: string;
  submitButtonText: string;
  formStyle: FormStyle;
}

const STORAGE_KEY = 'formluu_current_form';

export function useFormStorage(): {
  fields: FormField[];
  setFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  submitButtonText: string;
  setSubmitButtonText: React.Dispatch<React.SetStateAction<string>>;
  formStyle: FormStyle;
  setFormStyle: React.Dispatch<React.SetStateAction<FormStyle>>;
} {
  const [fields, setFields] = useState<FormField[]>([]);
  const [title, setTitle] = useState<string>('');
  const [submitButtonText, setSubmitButtonText] = useState<string>('Submit');
  const [formStyle, setFormStyle] = useState<FormStyle>({
    bgColor: '#ffffff',
    textColor: '#222222',
    font: 'Inter',
    buttonBgColor: '#000000',
    buttonTextColor: '#ffffff',
    logo: '',
    coverImage: '',
  });

  // Load fields and title from localStorage on initial mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { fields, title, submitButtonText, formStyle } = JSON.parse(stored) as StoredForm;
        setFields(fields || []);
        setTitle(title || '');
        setSubmitButtonText(submitButtonText || 'Submit');
        setFormStyle(formStyle || {
          bgColor: '#ffffff',
          textColor: '#222222',
          font: 'Inter',
          buttonBgColor: '#000000',
          buttonTextColor: '#ffffff',
          logo: '',
          coverImage: '',
        });
      } catch (err) {
        console.error('Failed to load stored form:', err);
      }
    }
  }, []);

  // Save fields and title to localStorage whenever they change
  useEffect(() => {
    const storedForm: StoredForm = {
      lastModified: Date.now(),
      fields,
      title,
      submitButtonText,
      formStyle,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedForm));
  }, [fields, title, submitButtonText, formStyle]);

  return {
    fields,
    setFields,
    title,
    setTitle,
    submitButtonText,
    setSubmitButtonText,
    formStyle,
    setFormStyle,
  };
}
