import React from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MaterialDatePicker from 'material-ui/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// injectTapEventPlugin();
// const muiTheme = getMuiTheme({
//   textFieldStyle: {
//     color: '#ffffff',
//   },
// });

export default class DatePicker extends React.PureComponent {

  // disablePrevDates() {
  //   const startSeconds = Date.parse(new Date());
  //   return (date) => {
  //     const maxDate = startSeconds + (14 * 1000 * 3600 * 24);
  //     return (Date.parse(date) < startSeconds || Date.parse(date) > maxDate);
  //   };
  // }

  render() {
    let DateTimeFormat;
    // DateTimeFormat = global.Intl.DateTimeFormat;

    return (
      <div className="datepicker-wr">
        <p>Select event's date:</p>
        <div className="datepicker-field">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendarAlt} color={'#808080'} />
          </div>
          {/*<MuiThemeProvider muiTheme={muiTheme}>*/}
            {/*<MaterialDatePicker*/}
            {/*  hintText="Portrait Inline Dialog"*/}
            {/*  container="inline"*/}
            {/*  className="input-datepicker"*/}
            {/*  disableYearSelection={true}*/}
            {/*  shouldDisableDate={this.disablePrevDates()}*/}
            {/*  onChange={this.props.onChange}*/}
            {/*  defaultDate={new Date(this.props.startDate)}*/}
            {/*  style={{*/}
            {/*    width: '100%',*/}
            {/*  }}*/}
            {/*  textFieldStyle={{*/}
            {/*    color: 'yellow',*/}
            {/*  }}*/}
            {/*  formatDate={new DateTimeFormat('en-US', {*/}
            {/*    day: 'numeric',*/}
            {/*    month: 'long',*/}
            {/*    year: 'numeric',*/}
            {/*  }).format}*/}
            {/*/>*/}
          {/*</MuiThemeProvider>*/}
        </div>
      </div>
    );
  }
}
