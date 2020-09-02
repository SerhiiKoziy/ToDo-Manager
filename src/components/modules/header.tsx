import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from "react-router";

import { Link } from "react-router-dom";

import { addUserStore } from '../../store/actions/userStoreActions';
// import { auth } from '../../store/action-firebase';
// import { loadUserInfo, uploadUserInfo } from '../../store/action-firebase/user';
// import { transformAvatarUrl } from '../../store/actions/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './header.scss';
import IState from "../../types/IState";

interface IHeaderProps {
  user: any;
  handleAuth: () => void;
  addUserStore: () => void;
}

const Header = ({ user, handleAuth, addUserStore }: IHeaderProps) => {
  const location = useLocation();

//   // static propTypes = {
//   //   user: PropTypes.object,
//   // };
//
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       openAuth: false,
//       PhotoUrl: '',
//     };
//
//     auth().onAuthStateChanged(user => {
//       if (user) {
//         this.loadProfile();
//         this.setState({ user, loaded: true });
//       }
//     });
//   }
//
//   async loadProfile() {
//     const user = auth().currentUser;
//     const uid = user.uid;
//     const res = await loadUserInfo(uid);
//     const defaultName = (user.displayName || this.getNameFromEmail(user.email)) || '1111';
//     let signAs;
//     let PhotoUrl;
//
//     const preparedUserData = {
//       uid: user.uid,
//       displayName: user.displayName,
//       email: user.email,
//       photoURL: user.photoURL,
//     };
//
//     this.props.addUserStore(preparedUserData);
//     if (res) {
//       signAs = res.name;
//       PhotoUrl = transformAvatarUrl(res.PhotoUrl);
//     } else {
//       signAs = defaultName;
//       uploadUserInfo(preparedUserData, uid);
//     }
//
//     this.setState({ name: signAs, PhotoUrl });
//   }
//
//   getNameFromEmail(email) {
//     const end = email.indexOf('@');
//     return email.slice(0, end);
//   }
//
  const renderRightBlock = (page: string) => {
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
  };

  const userName = (user && (user.displayName || user.email)) || 'User';

  const currentPath = location.pathname;
  let page = 'main';

  if (currentPath === '/') {
    page = 'main';
  } else if (currentPath === '/profile') {
    page = 'profile';
  }

  return (
    <header className="header">
      <div className="header-desktop">
        <Link to="/events">
          <span>logo</span>
        </Link>
        <Link to="/profile">
          <span>Hello!  Dear, {userName || 'User'}</span>
        </Link>
        <div className="login-wr" onClick={() => handleAuth()}>
          <div className="avatar-wr">
            {
              user && user.photoURL ?
                <img src={user.photoURL} alt="avatar" /> :
                <FontAwesomeIcon icon={faSignInAlt} />
            }
          </div>
        </div>
      </div>

      <div className="header-mobile">
        {
          renderRightBlock(page)
        }
        <Link to="/profile">
          <span>Hello!  Dear, {user && user.displayName || 'User'}</span>
        </Link>
        <div className="login-wr" onClick={() => handleAuth()}>
          <div className="avatar-wr">
            {
              user && user.photoURL ?
                <img src={user.photoURL} alt="avatar" /> :
                <FontAwesomeIcon icon={faSignInAlt} />
            }
          </div>
        </div>
      </div>

    </header>
  );
};

export default connect(
  (state: IState) => ({
    data: state.data,
    user: state.user
  }),
  { addUserStore }
)(Header);
