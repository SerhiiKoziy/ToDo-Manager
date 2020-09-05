import React, { useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import { useLocation } from "react-router";

import { Link } from "react-router-dom";

// import { auth } from '../../store/action-firebase';
import { getUserMeta } from '../../../store/user/selectors';
// import { loadUserInfo, uploadUserInfo } from '../../store/action-firebase/user';
// import { transformAvatarUrl } from '../../store/actions/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import IState from "../../../types/IState";

import styles from './styles.module.scss';

interface IHeaderProps {
  user: any;
  handleAuth: () => void;
}

const Index = ({ user, handleAuth }: IHeaderProps) => {
  const location = useLocation();
  const userMeta = useSelector(getUserMeta);

  const preparedTitle = useMemo(
    () => {
      return (userMeta?.displayName || userMeta?.email) || 'User';
    },
    [userMeta],
  );
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

  const url = userMeta?.photoURL;
  const currentPath = location.pathname;
  let page = 'main';

  if (currentPath === '/') {
    page = 'main';
  } else if (currentPath === '/profile') {
    page = 'profile';
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerDesktop}>
        <Link to="/events">
          <span>logo</span>
        </Link>
        <Link to="/profile">
          <span>Hello!  Dear, { preparedTitle }</span>
        </Link>
        <div className={styles.loginWrapper} onClick={() => handleAuth()}>
          <div className={styles.avatarWrapper}>
            {
              url ? (
                <img src={url} alt="avatar" />
              ) : (
                <FontAwesomeIcon icon={faSignInAlt} />
              )
            }
          </div>
        </div>
      </div>

      <div className={styles.headerMobile}>
        {
          renderRightBlock(page)
        }
        <Link to="/profile">
          <span>Hello!  Dear, { preparedTitle }</span>
        </Link>
        <div className="login-wr" onClick={() => handleAuth()}>
          <div className="avatar-wr">
            {
              url ? (
                <img src={url} alt="avatar" />
              ) : (
                <FontAwesomeIcon icon={faSignInAlt} />
              )
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
  { }
)(Index);
