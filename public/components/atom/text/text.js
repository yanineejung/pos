import React from "react";
import styles from "./text.module.css";
const Text = ({ text, title, type, style }) => {
  return (
    <p className={styles[type]} style={style} title={title}>
      {text}
    </p>
  );
};

export default Text;
