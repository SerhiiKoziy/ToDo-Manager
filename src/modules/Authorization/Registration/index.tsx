import React, {useCallback, useState} from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';
import {auth} from "firebase";

interface IRegistrationBlockProps {
  email: string;
  password: string;
  type: string;
  className?: string;
}

const RegistrationBlock = ({ className,email, password, type }: IRegistrationBlockProps) => {
  const [phase, setPhase] = useState('');
  const [emailValue, setEmail] = useState(email);
  const [passwordValue, setPassword] = useState(password);

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

  const handleChangeEmail = useCallback(
    (event) => setEmail(event.target.value),
    [],
  );

  const handleChangePassword = useCallback(
    (event) => setPassword(event.target.value),
    [],
  );

  return (
    <div className={styles.registrationWrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginWithEmail();
        }}
      >
        <h3>Enter your email</h3>
        <input
          type="email"
          onChange={handleChangeEmail}
          value={emailValue}
          placeholder="email"
        />
        <h3>Enter your pass</h3>
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
          {"Create account and log in"}
        </button>
      </form>
    </div>
  )
};

export default RegistrationBlock;
