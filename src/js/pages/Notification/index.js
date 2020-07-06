import React from 'react';
import { connect } from 'react-redux';

import { setList } from '../actions';

import './styles.scss';

class Index extends React.PureComponent {
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
        <span>Notification</span>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { data: state.data, user: state.user };
  },
  { setList }
)(Index);
