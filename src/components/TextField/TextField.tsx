import React from 'react';

interface ITextFieldProps {
  placeholder: string;
  errorVisible: boolean;
  errorText: string,
  onChange: () => void,
  onBlur: () => void,
  type: string,
  name: string,
  label: string,
  fieldName: string,
  classNameBox: string,
  value: string,
  id: string,
  maxLength: number,
}

const TextField = ({ onBlur, onChange, classNameBox, label, id, name, placeholder, maxLength, value, fieldName, errorText }: ITextFieldProps) => (
  <div className={`input-box ${classNameBox}`}>
    <label
      className="label"
      htmlFor={id}
    >
      {label}
    </label>
    <input
      name={name}
      placeholder={placeholder}
      id={id}
      maxLength={maxLength}
      onBlur={onBlur.bind(null, fieldName)}
      onChange={onChange.bind(null, fieldName)}
      value={value || ''}
    />
    <label className="error visible">{errorText}</label>
  </div>
);

export default TextField;
