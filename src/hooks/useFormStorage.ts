import { FormField } from '@/types/form';
import { useState, useEffect } from 'react';

interface StoredForm {
  lastModified: number;
  fields: FormField[];
  title: string;
  submitButtonText: string;
}

const STORAGE_KEY = 'formluu_current_form';

export function useFormStorage(): {
  fields: FormField[];
  setFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  submitButtonText: string;
  setSubmitButtonText: React.Dispatch<React.SetStateAction<string>>;
} {
  const [fields, setFields] = useState<FormField[]>([]);
  const [title, setTitle] = useState<string>('');
  const [submitButtonText, setSubmitButtonText] = useState<string>('Submit');

  // Load fields and title from localStorage on initial mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { fields, title, submitButtonText } = JSON.parse(stored) as StoredForm;
        setFields(fields || []);
        setTitle(title || '');
        setSubmitButtonText(submitButtonText || 'Submit');
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
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedForm));
  }, [fields, title, submitButtonText]);

  return {
    fields,
    setFields,
    title,
    setTitle,
    submitButtonText,
    setSubmitButtonText,
  };
}
