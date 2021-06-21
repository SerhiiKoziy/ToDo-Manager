import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '@material-ui/core';
import { auth } from 'firebase';

import styles from './styles.module.scss';

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
}

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
          <div className={styles.formWrapper}>
            <form
              className={styles.form}
              onSubmit={onSubmit}
            >
              <input
                className={styles.input}
                type="email"
                onChange={onChangeEmail}
                value={email}
                disabled
                placeholder="Email"
              />
              <Button
                className={styles.nextButton}
                name="next"
                size="small"
                variant="outlined"
                type="submit"
              >
                Next
              </Button>
            </form>
          </div>
        ) : (
          <div className={styles.formWrapper}>
            <form
              onSubmit={(e) => {
                // e.preventDefault();
                loginWithEmail();
              }}
            >
              <input
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
                value={password}
                disabled
              />
              <Button
                className={styles.nextButton}
                name="login"
                size="small"
                variant="text"
                type="submit"
              >
                {isCreationAccount ? 'Create account and log in' : 'Log in'}
              </Button>
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

      <div className={styles.societyButton}>
        <Button
          className={styles.googleAuth}
          name="login-google"
          variant="outlined"
          onClick={handleLoginWithGoogle}
        >
          Log in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
