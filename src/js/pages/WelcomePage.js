import React from 'react';
import { connect } from 'react-redux';

import { setList } from '../actions';

import './welcomePage.scss';

class WelcomePage extends React.PureComponent {
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
      <div className="welcome">
        <div className="route-wr">
          <span>welcome</span>
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
)(WelcomePage);
