import { useState, useEffect } from "react";
import { FormField } from "@/types/form";

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

const STORAGE_KEY = "formluu_current_form";

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
  const [title, setTitle] = useState<string>("Untitled Form");
  const [submitButtonText, setSubmitButtonText] = useState<string>("Submit");
  const [formStyle, setFormStyle] = useState<FormStyle>({
    bgColor: "#ffffff",
    textColor: "#222222",
    font: "Inter",
    buttonBgColor: "#000000",
    buttonTextColor: "#ffffff",
    logo: "",
    coverImage: "",
  });

  // Load stored data on first mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StoredForm;
        setFields(parsed.fields || []);
        setTitle(parsed.title || "Untitled Form");
        setSubmitButtonText(parsed.submitButtonText || "Submit");
        const storedStyle = parsed.formStyle || {};

        setFormStyle({
          bgColor: storedStyle.bgColor || "#ffffff",
          textColor: storedStyle.textColor || "#222222",
          font: storedStyle.font || "Inter",
          buttonBgColor: storedStyle.buttonBgColor || "#000000",
          buttonTextColor: storedStyle.buttonTextColor || "#ffffff",
          logo: storedStyle.logo || "",
          coverImage: storedStyle.coverImage || "",
        });

        // Immediately apply style to CSS variables
        document.documentElement.style.setProperty(
          "--bg-color",
          storedStyle.bgColor || "#ffffff"
        );
        document.documentElement.style.setProperty(
          "--text-color",
          storedStyle.textColor || "#222222"
        );
      } catch (err) {
        console.error("Failed to load stored form:", err);
      }
    }
  }, []);

  // Update localStorage when data changes
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

  // Update CSS variables when formStyle changes
  useEffect(() => {
    if (formStyle.bgColor) {
      document.documentElement.style.setProperty(
        "--bg-color",
        formStyle.bgColor
      );
    }
    if (formStyle.textColor) {
      document.documentElement.style.setProperty(
        "--text-color",
        formStyle.textColor
      );
    }
  }, [formStyle.bgColor, formStyle.textColor]);

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
