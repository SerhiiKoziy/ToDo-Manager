import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { addUserStore } from '../../actions/userStoreActions';
import { auth } from '../../../../firebase';
import { loadUserInfo, uploadUserInfo } from '../../../../firebase/user';
import { transformAvatarUrl } from '../../actions/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './header.scss';
import {Link} from "react-router";

class Header extends React.PureComponent {
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

    return (
      <header className="header">
        <div>logo</div>
        <Link to="/notification">
          <span>notification</span>
        </Link>
        <div>Hello!  Dear, {user.displayName || 'User'}</div>
        <div className="login-wr" onClick={() => this.props.handleAuth()}>
          <div className="avatar-wr">
            {
              user.photoURL ?
                <img src={user.photoURL} alt="avatar" /> :
                <FontAwesomeIcon icon={faSignInAlt} />
            }
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => {
    return { data: state.data, user: state.user };
  },
  { addUserStore }
)(Header);