import React, { InputHTMLAttributes, DetailedHTMLProps, ChangeEvent, useCallback, useEffect } from 'react';

interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  inputRef?: (ref: HTMLInputElement | null) => void;
}

const Input = ({ defaultValue = '', inputRef, onChange, onBlur, type, value, ...rest }: IInputProps) => {
  useEffect(
    () => {
      if (typeof onChange === 'function') {
        onChange(defaultValue as any);
      }
    },
    [defaultValue],
  );

  const handleChange= useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      // const newValue = unformatValue(value, type) as any;

      if (typeof onChange === 'function') {
        onChange(e);
      }

    },
    [type, onChange, onBlur],
  );

  return (
    <input
      ref={inputRef}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default Input;
