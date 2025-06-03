import styles from "./button.module.css";

const IconButton = ({ value, icon, onClick }) => {
  return <img className={styles["icon-btn"]} src={icon} />;
};
export default IconButton;
