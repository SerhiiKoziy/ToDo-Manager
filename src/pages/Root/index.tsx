import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Login from '../../modules/auth/auth';
import Header from '../../modules/Header';
import Footer from '../../modules/Footer';
import Dashboard from '../Dashboard';

import { fetchUserAction } from '../../store/user/actionCreators';
import { fetchEventsAction } from '../../store/events/actionCreators';

import IState from '../../types/IState';
import IUserMeta from "../../types/IUserMeta";

import './styles.scss';

interface IRootProps {
  userMeta: IUserMeta | null;
  fetchUserAction: () => void;
  fetchEventsAction: () => void;
  children?: any;
}

const Root = ({ children, userMeta, fetchUserAction, fetchEventsAction }: IRootProps) => {
  const [ openAuth, setOpenAuth ] = useState<boolean>(false);

  useEffect(
    () => {
      fetchUserAction();
    },
    [],
  );

  useEffect(
    () => {
      if (userMeta) {
        fetchEventsAction();
      }
    },
    [userMeta],
  );

  return (
    <div className="root">
      <Header handleAuth={() => setOpenAuth(true)} />

      <div className={`auth-wr ${openAuth ? 'open' : 'close'}`}>
        <div
          className="close-auth"
          onClick={() => setOpenAuth(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <Login />
      </div>

      <div className="route-wr">
        {children}

        <Dashboard />
      </div>

      <Footer />
    </div>
  );
};

export default connect(
  (state: IState) => ({
    user: state.user,
    userMeta: state.user.userMeta,
  }),
  { fetchUserAction, fetchEventsAction }
)(Root);
