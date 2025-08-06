import { FormField } from '@/types/form';
import { useState, useEffect } from 'react';

// Type for our stored form fields
interface StoredForm {
  lastModified: number;
  fields: FormField[];
}

const STORAGE_KEY = 'formluu_current_form';

export function useFormStorage() {
  const [fields, setFields] = useState<FormField[]>([]);

  // Load fields from localStorage on initial mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { fields } = JSON.parse(stored) as StoredForm;
        setFields(fields);
      } catch (err) {
        console.error('Failed to load stored form:', err);
      }
    }
  }, []);

  // Save fields to localStorage whenever they change
  useEffect(() => {
    const storedForm: StoredForm = {
      lastModified: Date.now(),
      fields,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedForm));
  }, [fields]);

  return {
    fields,
    setFields,
  };
}
