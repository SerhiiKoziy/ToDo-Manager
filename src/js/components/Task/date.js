import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
injectTapEventPlugin();
const muiTheme = getMuiTheme({
  datePicker: {
    // selectColor: '#fff',
  },
  textFieldStyle: {
    color: '#ffffff',
  },
});

function disablePrevDates() {
  const startSeconds = Date.parse(new Date());
  return (date) => {
    const maxDate = startSeconds + (14 * 1000 * 3600 * 24);
    return (Date.parse(date) < startSeconds || Date.parse(date) > maxDate);
  };
}

const DatePickerExampleInline = ({ onChange, startDate }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
      <DatePicker hintText="Portrait Inline Dialog"
        container="inline"
        className="input-datepicker"
        shouldDisableDate={disablePrevDates()}
        onChange={onChange}
        defaultDate={new Date(startDate)}
        style={{
          width: '100%',
        }}
        textFieldStyle={{
          color: 'yellow',
        }}
      />
    </MuiThemeProvider>
);

export default DatePickerExampleInline;
