import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialDatePicker from 'material-ui/DatePicker';

injectTapEventPlugin();
const muiTheme = getMuiTheme({
  textFieldStyle: {
    color: '#ffffff',
  },
});

export default class DatePicker extends React.PureComponent {
  static propTypes = {
    startDate: React.PropTypes.number,
    onChange: React.PropTypes.func,
  };

  disablePrevDates() {
    const startSeconds = Date.parse(new Date());
    return (date) => {
      const maxDate = startSeconds + (14 * 1000 * 3600 * 24);
      return (Date.parse(date) < startSeconds || Date.parse(date) > maxDate);
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MaterialDatePicker
          hintText="Portrait Inline Dialog"
          container="inline"
          className="input-datepicker"
          shouldDisableDate={this.disablePrevDates()}
          onChange={this.props.onChange}
          defaultDate={new Date(this.props.startDate)}
          style={{
            width: '100%',
          }}
          textFieldStyle={{
            color: 'yellow',
          }}
        />
      </MuiThemeProvider>
    );
  }
}
