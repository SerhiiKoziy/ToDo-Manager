import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/auth/auth';
import {Link} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

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

    const preparedUserData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    this.props.addUserStore(preparedUserData);
    if (res) {
      signAs = res.name;
      PhotoUrl = transformAvatarUrl(res.PhotoUrl);
    } else {
      signAs = defaultName;
      uploadUserInfo(preparedUserData, uid);
    }

    this.setState({ name: signAs, PhotoUrl });
  }

  render() {
    const { user } = this.props;

    console.log('user', user, user.photoUrl);
    return (
      <div className="root">
        <header className="header">
          <div>logo</div>
          <div>Hello!  Dear, {user.displayName || 'User'}</div>
          <div className="login-wr" onClick={() => this.setState({ openAuth: true })}>
            <div className="avatar-wr">
              {
                user.photoURL ?
                  <img src={user.photoURL} alt="avatar" /> :
                  <FontAwesomeIcon icon={faSignInAlt} />
              }
            </div>
            {/*{*/}
              {/*user && user.displayName ?*/}
                {/*<FontAwesomeIcon icon={faSignInAlt} /> :*/}
                {/*<FontAwesomeIcon icon={faSignOutAlt} />*/}
            {/*}*/}
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
    return { data: state.data, user: state.user };
  },
  { addUserStore }
)(Root);
