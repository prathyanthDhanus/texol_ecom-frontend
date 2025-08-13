import React from 'react';

import Input from './Input';
import TextArea from './TextArea';
import Dropdown from './Dropdown';
import SearchInput from './SearchInput';
import type { InputProps, TextAreaProps, DropdownProps, SearchInputProps } from './types';

type FormInputProps = 
  | ({ inputType: 'input' } & InputProps)
  | ({ inputType: 'textarea' } & TextAreaProps)
  | ({ inputType: 'dropdown' } & DropdownProps)
  | ({ inputType: 'search' } & SearchInputProps);

const FormInput: React.FC<FormInputProps> = (props) => {
  switch (props.inputType) {
    case 'input':
      return <Input {...props} />;
    case 'textarea':
      return <TextArea {...props} />;
    case 'dropdown':
      return <Dropdown {...props} />;
    case 'search':
      return <SearchInput {...props} />;
    default:
      return <Input {...props as InputProps} />;
  }
};

export default FormInput;