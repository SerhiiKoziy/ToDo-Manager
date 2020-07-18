// Vendor imports
import React from "react";
// Style imports
import styles from "./Button.module.scss";

interface Props {
  children?: JSX.Element;
  variant?: string;
  onClick?: () => void;
}

const button = ({ children, variant, onClick }: Props) => {
  let buttonClass = styles.primaryButton;
  if (variant && variant === "transparent") {
    buttonClass = styles.transparentButton;
  }
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default button;
