import React from "react";
import styles from "./topbar.module.css";

const Topbar = () => {
  return (
    <div className={styles["container"]}>
      <img className={styles["logo"]} src="/logo.png" />
      <img className={styles["avatar"]} src="/avatar.jpeg" />
    </div>
  );
};
export default Topbar;
