import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { auth } from 'firebase/app';
import { Button } from '@material-ui/core';

import Login from './Login';
import Registration from './Registration';

import styles from './styles.module.scss';

const Authorization = () => {
  const [phase, setPhase] = useState('start');
  const [type, setType] = useState('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sighOut = () => {
    auth().signOut();
    // this.props.deleteUserStore(); //TODO add handler
  };

  const handleChangeType = useCallback(
    () => setType(type === 'auth' ? 'registration' : 'auth'),
    [type]
  );

  const loginWithEmail = async () => {
    if (!email) {
      console.log('Email field is required');
    } else {
      const res = await auth().fetchSignInMethodsForEmail(email);

      if (res && res.length === 0) {
        console.log("Invalid login email. Please, registration your profile or choose a social button.");
        // this.setState({ preloader: false, activeButton: true });
      } else {
        // this.setState({ emailPhase: 'using', preloader: false, activeButton: false });
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
          { type === 'auth' ? 'Registration' : 'Authorization' }
        </Button>

        <Button
          className={styles.sighOut}
          name="sigh-out"
          variant="outlined"
          onClick={sighOut}
        >
          {'Sign out'}
        </Button>
      </div>
    </div>
  );
};

export default Authorization;
