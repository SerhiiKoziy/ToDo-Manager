import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Login from '../../components/auth/auth';
import Header from '../../components/modules/header';
import Footer from '../../components/modules/Footer';

import { getAllEventsDatabase } from '../../store/action-firebase/events';
import { saveUserClaimsAction } from '../../store/actions/userStoreActions';
import { setList } from '../../store/actions/tasksActions';
import { StoreState } from '../../store/reducers';

import './styles.scss';

interface IRootProps {
  children?: any;
  saveUserClaimsAction: (user: any) => void;
  getAllEventsDatabase: (callback: any) => Promise<any>;
  setList: (callback: any) => void;
}

const Root = ({ children, saveUserClaimsAction, getAllEventsDatabase, setList }: IRootProps) => {
  const [ openAuth, setOpenAuth ] = useState<boolean>(false);

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
    },
    [],
  );

  const callbackEvents = async (events: any) => {
    const eventsList = [];
    console.log('events', events)

    for (const key in events) {
      const messageInfo = events[key];
      eventsList.push(messageInfo);
    }

    if (eventsList && eventsList.length > 0) {
      return setList(eventsList);
    }
  };

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
  (state: StoreState) => ({
    data: state.data,
    user: state.user,
  }),
  { saveUserClaimsAction, getAllEventsDatabase, setList }
)(Root);
