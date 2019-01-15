import React from 'react';
import { connect } from 'react-redux';

import { setList } from '../actions';

import './notificationPage.scss';

class NotificationPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };
  }

  handleAuth() {
    this.setState({ openAuth: true });
  }

  render() {
    return (
      <div className="notification">
        <div className="route-wr">
          <span>Notification</span>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { data: state.data, user: state.user };
  },
  { setList }
)(NotificationPage);
