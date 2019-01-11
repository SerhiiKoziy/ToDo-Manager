import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/auth/auth';
import {Link} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { auth } from '../../../firebase';
import { loadUserInfo, uploadUserInfo } from '../../../firebase/user';
import { getAllEventsInfo } from '../../../firebase/events';
import { transformAvatarUrl } from '../actions/utils';
import { addUserStore } from '../actions/userStoreActions';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };

    auth().onAuthStateChanged(user => {
      if (user) this.loadProfile();
      this.props.addUserStore(user);
      this.setState({ user, loaded: true });
    });
  }

  componentDidMount() {
    getAllEventsInfo();
  }

  async loadProfile() {
    const user = auth().currentUser;
    const uid = user.uid;
    const res = await loadUserInfo(uid);
    const defaultName = user.displayName || this.getNameFromEmail(user.email);
    let signAs;
    let PhotoUrl;

    if (res) {
      signAs = res.name;
      PhotoUrl = transformAvatarUrl(res.PhotoUrl);
    } else {
      signAs = defaultName;
      uploadUserInfo({ name: defaultName, uid }, uid);
    }

    this.setState({ name: signAs, PhotoUrl });
  }

  render() {
    return (
      <div className="root">
        <header>
          <div>logo</div>
          <div>User: {this.state.name}</div>
          <div onClick={() => this.setState({ openAuth: true })}>
            <FontAwesomeIcon icon={faSignInAlt} />
          </div>
        </header>

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
    return { data: state.data };
  },
  { addUserStore }
)(Root);
