import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '@material-ui/core';

import styles from './styles.module.scss';
import {auth} from "firebase";

interface IRegistrationBlockProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeEmail: (value: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (value: ChangeEvent<HTMLInputElement>) => void;
  onChangePhase: (value: string) => void;
  loginWithEmail: () => void;
  email: string;
  password: string;
  phase: string;
  className?: string;
};

const Login = ({ className, email, password, phase, onSubmit, onChangeEmail, onChangePassword, onChangePhase, loginWithEmail }: IRegistrationBlockProps) => {
  const isCreationAccount = phase === 'creation';

  const forgotPassword = () => {
    auth().sendPasswordResetEmail(email);
  };

  const handleLoginWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    loginWithOtherAcc(provider);
  };

  const loginWithFacebook = () => {
    const provider = new auth.FacebookAuthProvider();

    loginWithOtherAcc(provider);
  };

  const loginWithOtherAcc = async (provider: any) => {
    auth().useDeviceLanguage();

    return await auth().signInWithRedirect(provider);
  };

  return (
    <div className={styles.loginWrapper}>
      <h3>Login using email</h3>
      {
        phase === 'start' ? (
          <div className={styles.enterWithEmail}>
            <form onSubmit={onSubmit}>
              <input
                type="email"
                onChange={onChangeEmail}
                value={email}
                placeholder="email"
              />
              <button name="next" type="submit">Next</button>
            </form>
          </div>
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                // e.preventDefault();
                loginWithEmail();
              }}
            >
              {/*<h2>*/}
              {/*  {*/}
              {/*    phase === 'creation' ? (*/}
              {/*      `Account with email ${emailValue}*/}
              {/*  does not exist. Enter password to create new account`*/}
              {/*    ) : 'Enter your password'*/}
              {/*  }*/}
              {/*</h2>*/}
              <input
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
                value={password}
              />
              <button
                name="login"
                type="submit"
              >
                {isCreationAccount ? 'Create account and log in' : 'Log in'}
              </button>
              <a onClick={() => onChangePhase('start')}>Back</a>
              {
                !isCreationAccount ? (
                  <a onClick={forgotPassword}>Forgot password ?</a>
                ) : null
              }
            </form>
          </div>
        )
      }

      <h3>Or google account</h3>

      <div className={styles.authButtons}>
        <Button
          name="login-google"
          variant="outlined"
          onClick={handleLoginWithGoogle}
        >
          Log in with Google
        </Button>
      </div>
    </div>
  )
};

export default Login;
