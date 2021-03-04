import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useSelector } from "react-redux";
import { auth } from 'firebase/app';
import { Button } from '@material-ui/core';

import { getIsUserLogin } from "@store/user/selectors";

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

  const loginWithEmail = async () => await auth().fetchSignInMethodsForEmail(email);

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

  const onSubmit = useCallback( // TODO complete onSubmit
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email) {
        console.log('Email field is required');
      } else {
        loginWithEmail()
          .then((res) => {
            if (res && res.length === 0) {
              console.log("Invalid login email. Please, registration your profile or choose a social button.");
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      }
    },
    [email],
  );

  if (phase === 'sendingFormData') {
    return <div className={styles.login}> {'loading...'} </div>;
  }

  return (
    <div className={styles.authorization}>
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
          className={styles.changeFormTypeButton}
          name="change-type"
          variant="outlined"
          onClick={handleChangeType}
        >
          { type === 'login' ? 'Registration' : 'Authorization' }
        </Button>

        {
          isUserLogin && (
            <Button
              className={styles.sighOutButton}
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
