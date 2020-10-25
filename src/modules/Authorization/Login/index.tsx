import React, { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';

import classNames from 'classnames';

import styles from './styles.module.scss';
import {auth} from "firebase";

interface IRegistrationBlockProps {
  email: string;
  password: string;
  phase: string;
  type: string;
  className?: string;
}

export const LoginBlock = ({ className, email, password, phase, type }: IRegistrationBlockProps) => {
  const [phaseValue, setPhase] = useState(phase);
  const [emailValue, setEmail] = useState(email);
  const [passwordValue, setPassword] = useState(password);

  const cr = phaseValue === 'creation';

  const handleEmail = async () => {
    if (!emailValue) {
      console.log('Email field is required');
    } else {
      const res = await auth().fetchSignInMethodsForEmail(emailValue);

      if (res && res.length === 0) {
        console.log("Invalid login email. Please, registration your profile or choose a social button.");
        // this.setState({ preloader: false, activeButton: true });
      } else {
        // this.setState({ emailPhase: 'using', preloader: false, activeButton: false });
      }
    }
  };

  const loginWithEmail = async () => {
    const request = () => type === 'auth' ?
      auth().signInWithEmailAndPassword(emailValue, passwordValue) :
      auth().createUserWithEmailAndPassword(emailValue, passwordValue);

    try {
      setPhase('sendingFormData')
    } catch (err) {
      console.error('Login error', err);
      // let code = err.code;
      // if (code === 'auth/wrong-password')
      //   message.error('Wrong password');
      // else if (code === 'auth/weak-password')
      //   message.error('Weak password');
      // else
      //   message.error(`Authentication error: ${code}`);
    }
  };

  const forgotPassword = () => {
    auth().sendPasswordResetEmail(emailValue);
    // message.success('Email sent')
    // this.setState({ refresh: Math.random() });
  };

  const handleChangeEmail = useCallback(
    (event) => setEmail(event.target.value),
    [],
  );

  const handleChangePassword = useCallback(
    (event) => setPassword(event.target.value),
    [],
  );

  const handleChangePhase = useCallback(
    (phase) => setPhase(phase),

    [],
  );


  const handleLoginWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    loginWithOtherAcc(provider);
  };

  const loginWithFacebook = () => {
    const provider = new auth.FacebookAuthProvider();

    loginWithOtherAcc(provider);
  };

  const loginWithOtherAcc = async (provider: any) => {
    // this.setState({ emailPhase: 'sendingFormData' });
    auth().useDeviceLanguage();

    return await auth().signInWithRedirect(provider);
  };

  return (
    <div className={styles.loginWrapper}>
      {
        phase === 'start' ? (
          <div className={styles.enterWithEmail}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmail();
              }}
            >
              <h3>Enter your email</h3>
              <input
                type="email"
                onChange={handleChangeEmail}
                value={emailValue}
                placeholder="email"
              />
              {/* {this.state.preloader ? <Spin /> :
          <Button name="next" type="primary" htmlType='submit'>Next</Button>}*/}
              <button name="next" type="submit">Next</button>
            </form>
          </div>
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginWithEmail();
              }}
            >
              <h2>
                {
                  phase === 'creation' ? (
                    `Account with email ${emailValue}
                does not exist. Enter password to create new account`
                  ) : 'Enter your password'
                }
              </h2>
              <input
                type="password"
                placeholder="Password"
                onChange={handleChangePassword}
                value={passwordValue}
              />
              <button
                name="login"
                type="submit"
              >
                {cr ? 'Create account and log in' : 'Log in'}
              </button>
              <a onClick={() => handleChangePhase('start')}>Back</a>
              {cr ? null : <a onClick={forgotPassword}>Forgot password ?</a>}
            </form>
          </div>
        )
      }

      <div className={styles.authButtons}>
        <Button
          // name="login-google"
          // type="primary"
          onClick={handleLoginWithGoogle}
        >
          Log in with Google
        </Button>
      </div>
    </div>
  )
};

// export default LoginBlock1;
