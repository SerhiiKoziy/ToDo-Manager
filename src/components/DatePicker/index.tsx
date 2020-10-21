import React, { ReactElement, useEffect, useState, useMemo, ReactNode } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { WrappedFieldProps } from "redux-form";
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import buildClassName from '../../utils/buildClassName';
import styles from "./styles.module.scss";

interface IDatePicker {
  label?: ReactNode;
  inputRef: (ref: HTMLInputElement | null) => void;
  disabledDates?: (date: Date | null) => boolean;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}

const DATE_FORMAT = 'dd.MM.yyyy';

const DatePicker = ({ className, input, disabledDates, defaultValue, required, meta: { touched, invalid, error }, inputRef, label, ...rest }: IDatePicker & WrappedFieldProps ): ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const currentValue: Date | null = useMemo(
    () => input.value ? new Date(input.value) : null,
    [input.value],
  );

  useEffect(
    () => {
      if (typeof defaultValue !== 'undefined') {
        handleAsyncChange(defaultValue);
      }
    },
    [defaultValue],
  );

  const handleAsyncChange = (date: string) => {
    setIsFocused(false);
    setHasError(false);

    input.onChange(date);
  };

  const handleChange = (date: Date | null) => {
    const stringDate = JSON.parse(JSON.stringify(date));

    handleAsyncChange(stringDate);
    input.onBlur(stringDate);
  };

  const handleError = (error: ReactNode) => setHasError(!!error);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const setInputRef = (ref: HTMLInputElement | null) => {
    if (typeof inputRef === 'function') {
      inputRef(ref && ref.children[0].children[0] as HTMLInputElement);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormControl
        className={
          buildClassName(
            styles.advancedDatePickerField,
          )
        }
        error={touched && !!error}
      >

        {label && (
          <InputLabel
            className={styles.label}
            focused={isFocused}
            error={touched && invalid}
            required={required}
            shrink
          >
            {label}
          </InputLabel>
        )}

        <KeyboardDatePicker
          variant="inline"
          format={DATE_FORMAT}
          value={currentValue || null}
          innerRef={setInputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoOk
          onError={handleError}
          FormHelperTextProps={{
            className: styles.errorHelper,
          }}
          shouldDisableDate={disabledDates}
          maxDate={'2027-01-01'}
          {...rest}
        />

        {touched && error && (
          <FormHelperText className={styles.errorHelper}>{error}</FormHelperText>
        )}
      </FormControl>
    </MuiPickersUtilsProvider>
  )
};

export default DatePicker;
