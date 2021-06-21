import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { getUserMeta } from '@store/user/selectors';

import styles from './styles.module.scss';

interface IHeaderProps {
  handleAuth: () => void;
}

const Header = ({ handleAuth }: IHeaderProps) => {
  const location = useLocation();
  const userMeta = useSelector(getUserMeta);

  const preparedTitle = useMemo(
    () => {
      return (userMeta?.displayName || userMeta?.email) || 'User';
    },
    [userMeta],
  );

//   getNameFromEmail(email) {
//     const end = email.indexOf('@');
//     return email.slice(0, end);
//   }

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
        {/*<div className="login-wr" onClick={() => handleAuth()}>*/}
        {/*  <div className="avatar-wr">*/}
        {/*    {*/}
        {/*      url ? (*/}
        {/*        <img src={url} alt="avatar" />*/}
        {/*      ) : (*/}
        {/*        <FontAwesomeIcon icon={faSignInAlt} />*/}
        {/*      )*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </header>
  );
};

export default Header;
