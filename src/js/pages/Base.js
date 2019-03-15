import React from 'react';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { getAllEventsDatabase } from '../action-firebase/events';

import './root.scss';

export default class Base extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
      eventsList: [],
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) getAllEventsDatabase(this.callbackEvents.bind(this));
    });

    this.handleAuth = this.handleAuth.bind(this);
  }

  async callbackEvents(events) {
    const eventsList = [];

    for (const key in events) {
      const messageInfo = events[key];
      eventsList.push(messageInfo);
    }
  }

  handleAuth() {
    this.setState({ openAuth: true });
  }

  render() {
    return (
      <div className="root">
        <div className="auth-wr open">
          <div
            className="close-auth"
            onClick={() => this.setState({ openAuth: false })}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </div>
    );
  }
}

