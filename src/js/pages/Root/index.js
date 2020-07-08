import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Login from '../../components/auth/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/modules/header';
import Footer from '../../components/modules/footer';

import { getAllEventsDatabase } from '../../action-firebase/events';
import { saveUserClaimsAction } from '../../actions/userStoreActions';
import { setList } from '../../actions';

import './styles.scss';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
      eventsList: [],
    };


    this.handleAuth = this.handleAuth.bind(this);
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.props.saveUserClaimsAction(user);
      if (user) {
        getAllEventsDatabase(this.callbackEvents.bind(this))
      }
    });
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
        <Header
          handleAuth={() => this.handleAuth()}
          location={this.props.location}
        />

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

        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => ({ data: state.data, user: state.user }),
  { saveUserClaimsAction, setList }
)(Root);
