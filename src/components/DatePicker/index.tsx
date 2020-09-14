import React, { ReactElement } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import classNames from "classnames";
import { WrappedFieldProps } from "redux-form";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import styles from "./styles.module.scss";

interface IDatePicker {
  label?: string;
  className?: string;
}

const DatePicker = ({ className, input,  meta: { touched, invalid, error }, label }: IDatePicker & WrappedFieldProps ): ReactElement => {

  // disablePrevDates() {
  //   const startSeconds = Date.parse(new Date());
  //   return (date) => {
  //     const maxDate = startSeconds + (14 * 1000 * 3600 * 24);
  //     return (Date.parse(date) < startSeconds || Date.parse(date) > maxDate);
  //   };
  // }

  return (
    <div className={classNames(styles.datepickerWr, className)}>
      <div className={styles.datepickerField}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id="date-picker-inline"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label={label}
            error={touched && invalid}
            className={styles.datepicker}
            helperText={touched && error}
            {...input}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  )
};

export default DatePicker;
