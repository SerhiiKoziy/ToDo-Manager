import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Login from '../components/auth/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/modules/header';

import { getAllEventsInfoDatabase } from '../../../firebase/events';
import { getAllEventsFromDatabase, setList } from '../actions';

import './root.scss';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
      eventsList: [],
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) getAllEventsInfoDatabase(this.callbackEvents.bind(this));
    });

    this.handleAuth = this.handleAuth.bind(this);
  }

  async callbackEvents(events) {
    const eventsList = [];

    for (const key in events) {
      const messageInfo = events[key];
      eventsList.push(messageInfo);
    }

    if (eventsList && eventsList.length > 0) this.props.setList(eventsList);
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
  { getAllEventsFromDatabase, setList }
)(Root);
