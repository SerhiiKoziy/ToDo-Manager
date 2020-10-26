import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useSelector } from "react-redux";
import { auth } from 'firebase/app';
import { Button } from '@material-ui/core';

import { getIsUserLogin } from "../../store/user/selectors";

import Login from './Login';
import Registration from './Registration';

import styles from './styles.module.scss';

const Authorization = () => {
  const [phase, setPhase] = useState('start');
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isUserLogin = useSelector(getIsUserLogin);

  const sighOut = useCallback(
    () => {
      auth().signOut();
      // dispatch(deleteUserStore()); //TODO add handler
    }, []
  );

  const handleChangeType = useCallback(
    () => setType(type === 'login' ? 'registration' : 'login'),
    [type]
  );

  const loginWithEmail = async () => {
    if (!email) {
      console.log('Email field is required');
    } else {
      const res = await auth().fetchSignInMethodsForEmail(email);

      if (res && res.length === 0) {
        console.log("Invalid login email. Please, registration your profile or choose a social button.");
      }
    }
  };

  const onChangePhase = useCallback(
    (phase: string) => setPhase(phase),
    [],
  );

  const onChangeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
    [],
  );

  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
    [],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginWithEmail();
    },
    [],
  );

  if (phase === 'sendingFormData') {
    return <div className={styles.login}> {'loading...'} </div>;
  }

  return (
    <div className={styles.login}>
      {
        type === 'registration' ? (
          <Registration
            email={email}
            password={password}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onSubmit={onSubmit}
          />
        ) : (
          <Login
            phase={phase}
            email={email}
            password={password}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangePhase={onChangePhase}
            onSubmit={onSubmit}
            loginWithEmail={loginWithEmail}
          />
        )
      }

      <div className={styles.controlButtons}>
        <Button
          className={styles.changeTab}
          name="change-type"
          variant="outlined"
          onClick={handleChangeType}
        >
          { type === 'login' ? 'Registration' : 'Authorization' }
        </Button>

        {
          isUserLogin && (
            <Button
              className={styles.sighOut}
              name="log-out"
              variant="outlined"
              onClick={sighOut}
            >
              {'Log out'}
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default Authorization;
