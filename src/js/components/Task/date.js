import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
import * as actions from '../../actions';
injectTapEventPlugin();
const muiTheme = getMuiTheme({
  datePicker: {
    //selectColor: '#fff',
  },
  textFieldStyle:{
    color: '#ffffff',
  }
});

function disablePrevDates() {
  const startDate = new Date();
  const startSeconds = Date.parse(startDate);
  //Date.parse(date)
  //console.log(date,  startSeconds);
  return (date) => {
    console.log( date);
    return Date.parse(date) < startSeconds;
  }
}

function setFechaDesde(x,event){
  let curDate = Date.parse(new Date());
  let dayBeforeDate = Math.ceil((Date.parse(event) - curDate) / 1000 / 3600 / 24);
  console.log( dayBeforeDate);
}
const DatePickerExampleInline = () => (

  <MuiThemeProvider muiTheme={muiTheme}>
      <DatePicker hintText="Portrait Inline Dialog"
                  container="inline"
                  //shouldDisableDate={}
                  onChange={(x, event) => setFechaDesde(x,event)}
                  style={{
                    width: '100%'
                  }}
                  textFieldStyle={{
                    color: 'white'
                  }}/>
    </MuiThemeProvider>
);

export default DatePickerExampleInline;