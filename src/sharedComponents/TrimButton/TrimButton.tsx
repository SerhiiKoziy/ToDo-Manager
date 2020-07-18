// Vendor imports
import React from "react";
// Style imports
import styles from "./TrimButton.module.scss";

interface Props {
  name?: string;
  price?: string;
  active?: boolean;
  onClick?: () => void;
}

const trimButton = ({ name, price, active, onClick }: Props) => {
  const activeStyle = `${styles.trimButton} ${
    active ? styles.activeTrimButton : ""
  }`;
  return (
    <button onClick={onClick} className={activeStyle}>
      <span>{name}</span>
      <div className={styles.price}>{price}</div>
    </button>
  );
};

export default trimButton;
