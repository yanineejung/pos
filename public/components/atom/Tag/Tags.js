import React from "react";
import styles from "./tag.module.css";

const Tag = ({ text }) => {
  return <div className={styles["container"]}>{text}</div>;
};

export default Tag;
