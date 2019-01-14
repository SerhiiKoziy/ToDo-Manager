import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/auth/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/modules/header';

import { getAllEventsInfo } from '../../../firebase/events';
import { addUserStore } from '../actions/userStoreActions';
import './root.scss';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  componentDidMount() {
    getAllEventsInfo();
  }

  handleAuth() {
    this.setState({ openAuth: true });
  }

  render() {
    return (
      <div className="root">
        <Header handleAuth={() => this.handleAuth()} />

        <div className={`auth-wr ${this.state.openAuth ? 'open' : 'close'}`}>
          <div
            className="close-auth"
            onClick={() => this.setState({ openAuth: false })}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <Login />
        </div>

        <div className="route-wr">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { data: state.data, user: state.user };
  },
  { addUserStore }
)(Root);
