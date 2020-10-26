import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '@material-ui/core';

import styles from './styles.module.scss';

interface IRegistrationBlockProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeEmail: (value: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (value: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  className?: string;
}

const Registration = ({ className, email, password, onChangeEmail, onChangePassword, onSubmit }: IRegistrationBlockProps) => {
  return (
    <div className={styles.registrationWrapper}>
      <form onSubmit={onSubmit}>
        <h3>Enter your email</h3>
        <input
          type="email"
          onChange={onChangeEmail}
          value={email}
          placeholder="email"
        />
        <h3>Enter your pass</h3>
        <input
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
          value={password}
        />
        <Button
          name="login"
          type="submit"
        >
          {"Create account and log in"}
        </Button>
      </form>
    </div>
  )
};

export default Registration;
