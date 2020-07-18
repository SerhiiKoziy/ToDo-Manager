// Vendor imports
import React, { memo } from "react";
// Style imports
import styles from "./ColorButton.module.scss";

interface Props {
  img?: string;
  title?: string;
  price?: string;
  onClick?: () => void;
  active?: boolean;
}

const colorButton = memo(({ img, title, price, onClick, active }: Props) => {
  const buttonStyles = active
    ? `${styles.colorButton} ${styles.activeButton}`
    : styles.colorButton;
  return (
    <div className={buttonStyles} onClick={onClick}>
      <img className={styles.colorImg} src={img} alt={title} />
      <div className={styles.title}>{title}</div>
      <div className={styles.price}>{price}</div>
    </div>
  );
});

export default colorButton;
