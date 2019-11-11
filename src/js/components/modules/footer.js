import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

import { Link } from 'react-router';

import { addUserStore } from '../../actions/userStoreActions';

import './footer.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };
  }

  render() {
    return (
      <footer className="footer">
        <div className="footer-tab">
          <Link to="/">
            <span>Main</span>
          </Link>
        </div>
        <div className="footer-tab">
          <Link to="/events">
            <span>Tasks</span>
          </Link>
        </div>
        <div className="footer-tab">
          <Link to="/profile">
            <span>Options</span>
          </Link>
        </div>
      </footer>
    );
  }
}

export default connect(
  (state) => {
    return { data: state.data, user: state.user };
  },
  { addUserStore }
)(Footer);
