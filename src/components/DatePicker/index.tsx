import React, {ReactElement, useEffect, useState, useMemo, ReactNode, useCallback} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import classNames from "classnames";
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
  defaultValue?: string;
  required?: boolean;
  className?: string;
}

const DATE_FORMAT = 'dd.MM.yyyy';

const DatePicker = ({ className, input, defaultValue, required, meta: { touched, invalid, error }, inputRef, label, ...rest }: IDatePicker & WrappedFieldProps ): ReactElement => {
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

  const disabledDates = useCallback(
    (date) => {
      const currentDate = Date.parse(`${new Date()}`);
      const maxDateFromCurrent = currentDate + (14 * 1000 * 3600 * 24); // 14 days //TODO make logic without seconds

      return Date.parse(date) > maxDateFromCurrent;
    },
    [],
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormControl
        className={
          buildClassName(
            styles.advancedDatePickerField,
            // {
            //   [styles.withoutError]: (!touched || !invalid) && !hasError,
            // },
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
          disablePast
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
