import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
injectTapEventPlugin();
const muiTheme = getMuiTheme({
  datePicker: {
    //selectColor: '#fff',
  },
  textFieldStyle:{
    color: '#ffffff',
  }
});

function disablePrevDates(startDate) {
  const startSeconds = Date.parse(startDate);
  return (date) => {
    const maxDate = startSeconds + (14 * 1000 * 3600 * 24);
    //return Date.parse(date) < startSeconds && Date.parse(date) < maxDate;
    return  Date.parse(date) > maxDate;
  }
}
const startDate = new Date();
const DatePickerExampleInline = ({onChange}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
      <DatePicker hintText="Portrait Inline Dialog"
                  container="inline"
                  shouldDisableDate={disablePrevDates(startDate)}
                  onChange={onChange}
                  style={{
                    width: '100%'
                  }}
                  textFieldStyle={{
                    color: 'white'
                  }}/>
    </MuiThemeProvider>
);

export default DatePickerExampleInline;