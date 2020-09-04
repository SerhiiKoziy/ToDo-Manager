import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Login from '../../components/auth/auth';
import Header from '../../components/modules/header';
import Footer from '../../components/modules/Footer';

import { getAllEventsDatabase } from '../../store/action-firebase/events';
import { saveUserClaimsAction } from '../../store/actions/userStoreActions';

import { fetchUserAction } from '../../store/user/actionCreators';
import { fetchEventsAction } from '../../store/events/actionCreators';
import { setList } from '../../store/actions/tasksActions';
import IState from '../../types/IState';

import './styles.scss';
import IUserMeta from "../../types/IUserMeta";

interface IRootProps {
  userMeta: IUserMeta | null;
  children?: any;
  saveUserClaimsAction: (user: any) => void;
  fetchEventsAction: () => void;
  setList: (callback: any) => void;
  fetchUserAction: () => void;
}

const Root = ({ children, userMeta, fetchUserAction, fetchEventsAction, setList }: IRootProps) => {
  const [ openAuth, setOpenAuth ] = useState<boolean>(false);

  useEffect(
    () => {
      fetchUserAction();
    },
    [],
  );

  useEffect(
    () => {
      // firebase.auth().onAuthStateChanged(user => {
      //   saveUserClaimsAction(user);
      //
      //   if (user) {
      //     getAllEventsDatabase(callbackEvents)
      //       .then((res: any) => {
      //         console.log('res', res)
      //       })
      //       .catch((error) => {
      //         console.log('error', error)
      //       })
      //   }
      // });

      if (userMeta) {
        fetchEventsAction();
      }
    },
    [userMeta],
  );

  // const callbackEvents = async (events: any) => {
  //   const eventsList = [];
  //   console.log('events', events)
  //
  //   for (const key in events) {
  //     const messageInfo = events[key];
  //     eventsList.push(messageInfo);
  //   }
  //
  //   if (eventsList && eventsList.length > 0) {
  //     return setList(eventsList);
  //   }
  // };

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
      </div>

      <Footer />
    </div>
  );
};

export default connect(
  (state: IState) => ({
    data: state.data,
    user: state.user,
    userMeta: state.user.userMeta,
  }),
  { fetchUserAction, saveUserClaimsAction, fetchEventsAction, setList }
)(Root);
