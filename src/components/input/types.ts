import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { ObjectSchema } from 'yup';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

export interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
  validationSchema?: ObjectSchema<any>;
}

export interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>,
    BaseInputProps {
  type?: InputType;
  name: string; 
}

export interface TextAreaProps 
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>,
    BaseInputProps {
  name: string;
}

export interface DropdownProps 
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  validationSchema?: ObjectSchema<any>;
  options: { value: string | number; label: string }[];
  placeholder?: string; 
}

export interface SearchInputProps extends InputProps {
  onSearch: (value: string) => void;
}