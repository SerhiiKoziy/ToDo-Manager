import React, { ReactElement, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface IDatePicker {
  label?: string;
}
const DatePicker = ({ label }: IDatePicker ): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2020-08-18T21:11:54'));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  // disablePrevDates() {
  //   const startSeconds = Date.parse(new Date());
  //   return (date) => {
  //     const maxDate = startSeconds + (14 * 1000 * 3600 * 24);
  //     return (Date.parse(date) < startSeconds || Date.parse(date) > maxDate);
  //   };
  // }

  return (
    <div className="datepicker-wr">
      <p>Select event's date:</p>
      <div className="datepicker-field">
        <div className="icon">
          <FontAwesomeIcon icon={faCalendarAlt} color={'#808080'} />
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id="date-picker-inline"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label={label}
            value={selectedDate}
            onChange={handleDateChange}
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
