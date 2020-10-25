import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Login from '../../modules/auth/auth';
import Header from '../../modules/Header';
import Footer from '../../modules/Footer';
import Dashboard from '../Dashboard';

import { fetchUserAction } from '../../store/user/actionCreators';
import { getUserMeta } from '../../store/user/selectors';
import { fetchEvents } from '../../store/events/actionCreators';

import styles from './styles.module.scss';
import classNames from "classnames";

interface IRootProps {
  children?: any;
}

const Root = ({ children }: IRootProps) => {
  const [ openAuth, setOpenAuth ] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userMeta = useSelector(getUserMeta);

  useEffect(
    () => {
      dispatch(fetchUserAction());
    },
    [dispatch],
  );

  useEffect(
    () => {
      if (userMeta) {
        dispatch(fetchEvents());
      }
    },
    [userMeta, dispatch],
  );

  return (
    <div className={styles.root}>
      <Header handleAuth={() => setOpenAuth(true)} />

      <div
        className={
          classNames(
            styles.authWr,
            {
              [styles.open]: openAuth,
              [styles.close]: !openAuth,
            }
          )
        }
      >
        <div
          className={styles.closeAuth}
          onClick={() => setOpenAuth(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <Login />
      </div>

      <div className={styles.routeWr}>
        {children}

        <Dashboard />
      </div>

      <Footer />
    </div>
  );
};

export default Root
