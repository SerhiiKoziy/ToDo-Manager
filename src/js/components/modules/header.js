import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

import { Link } from 'react-router';

import { addUserStore } from '../../actions/userStoreActions';
import { auth } from '../../action-firebase';
import { loadUserInfo, uploadUserInfo } from '../../action-firebase/user';
import { transformAvatarUrl } from '../../actions/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };

    // auth().onAuthStateChanged(user => {
    //   if (user) this.loadProfile();
    //   this.setState({ user, loaded: true });
    // });
  }

  async loadProfile() {
    const user = auth().currentUser;
    const uid = user.uid;
    const res = await loadUserInfo(uid);
    const defaultName = (user.displayName || this.getNameFromEmail(user.email)) || '1111';
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

  getNameFromEmail(email) {
    const end = email.indexOf('@');
    return email.slice(0, end);
  }

  renderRightBlock(page) {
    switch (page) {
      case 'main':
        return (
          <Link
            className="right-button"
            to="/add"
          >
            <span>add +</span>
          </Link>
        );

      case 'profile':
        return (
          <div className="right-button">
            <span>back</span>
          </div>
        );

      default:
        return (
          <div className="right-button" />
        );
    }
  }

  render() {
    const { user } = this.props;
    const currentPath = this.props.location.pathname;
    let page = 'main'

    console.log('currentPath', currentPath)

    if (currentPath === '/') {
      page = 'main';
    } else if (currentPath === '/profile') {
      page = 'profile';
    }

    return (
      <header className="header">

        <div className="header-desktop">
          <Link to="/">
            <span>logo</span>
          </Link>
          <Link to="/profile">
            <span>Hello!  Dear, {user.displayName || 'User'}</span>
          </Link>
          <div className="login-wr" onClick={() => this.props.handleAuth()}>
            <div className="avatar-wr">
              {
                user.photoURL ?
                  <img src={user.photoURL} alt="avatar" /> :
                  <FontAwesomeIcon icon={faSignInAlt} />
              }
            </div>
          </div>
        </div>

        <div className="header-mobile">
          {
            this.renderRightBlock(page)
          }
          <Link to="/profile">
            <span>Hello!  Dear, {user.displayName || 'User'}</span>
          </Link>
          <div className="login-wr" onClick={() => this.props.handleAuth()}>
            <div className="avatar-wr">
              {
                user.photoURL ?
                  <img src={user.photoURL} alt="avatar" /> :
                  <FontAwesomeIcon icon={faSignInAlt} />
              }
            </div>
          </div>
        </div>

      </header>
    );
  }
}

export default connect(
  (state) => ({ data: state.data, user: state.user }),
  { addUserStore }
)(Header);
