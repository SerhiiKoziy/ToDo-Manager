import React from 'react';

import styles from './styles.module.scss';

interface Props {
  children?: JSX.Element;
  variant?: string;
  onClick?: () => void;
}

const Button = ({ children, variant, onClick }: Props) => {
  let buttonClass = styles.primaryButton;
  if (variant && variant === 'transparent') {
    buttonClass = styles.transparentButton;
  }
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
