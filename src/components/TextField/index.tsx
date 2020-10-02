import React from 'react';
import classNames from 'classnames';
import { WrappedFieldProps } from 'redux-form';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Input from "./Input";

import styles from "./styles.module.scss";

const inputProps: TextFieldProps['InputProps'] = {
  inputComponent: Input,
};

interface ITextFieldProps {
  charactersMaxCount?: number;
}

const Field = ({ className, defaultValue, label, InputProps, input, placeholder, meta: { touched, invalid, error }, ...custom }: ITextFieldProps & TextFieldProps & WrappedFieldProps) => {
  return (
    <TextField
      className={classNames(styles.input, className)}
      label={label}
      placeholder={placeholder}
      error={touched && invalid}
      helperText={touched && error}
      defaultValue={defaultValue}
      InputProps={{
        inputComponent: Input,
        ...InputProps,
      }}
      {...input}
      {...custom}
    />
  );
};

export default Field;
