import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/auth/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/modules/header';

import { getAllEventsInfoDatabase } from '../../../firebase/events';
import { getAllEventsFromDatabase, setList } from '../actions';

import './root.scss';
// import { auth } from '../../../firebase';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };
    // auth().onAuthStateChanged(user => {
    //
    //   this.setState({ user });
    // })
    this.handleAuth = this.handleAuth.bind(this);
  }

  // async componentDidMount() {
  //   // auth().onAuthStateChanged(user => {
  //   //   // if (user) getAllEventsFromDatabase();
  //   //
  //   //   // if (user) getAllEventsInfoDatabase(this.callbackEvents);
  //   //
  //   // });
  //
  //
  //   console.log('1111', this.state);
  //   this.setState({ load: true }, await getAllEventsInfoDatabase(this.callbackEvents));
  // }

  // async callbackEvents(events) {
  //   const eventsList = [];
  //
  //   for (const key in events) {
  //     const messageInfo = events[key];
  //     eventsList.push(messageInfo);
  //   }
  //
  //   console.log('eventsList setList', eventsList);
  //
  //   eventsList && eventsList.length > 0 && this.setState({ eventsList });
  //   // this.setState({eventsList})
  //   // return eventsList;
  // }

  handleAuth() {
    this.setState({ openAuth: true });
  }

  render() {
    console.log('DATA', this.props.data);
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
