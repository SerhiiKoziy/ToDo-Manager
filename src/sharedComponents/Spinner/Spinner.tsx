// Vendor imports
import React from "react";
// Style imports
import styles from "./Spinner.module.scss";

interface Props {
  size?: number;
  color?: string;
}
const Spinner = ({ size = 50, color = "black" }: Props) => (
  <div className={styles.spinner}>
    <svg id="triangle" width={size} height={size} viewBox="-3 -4 39 39">
      <polygon
        fill="transparent"
        stroke={color}
        strokeWidth="1"
        points="16,0 32,32 0,32"
      />
    </svg>
  </div>
);

export default Spinner;
