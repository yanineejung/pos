import styles from "./textbox.module.css";
const Textbox = ({ placeholder, onChange, icon }) => {
  return (
    <div className={styles["input-wrapper"]}>
      {icon && <img className={styles["input-icon"]} src={icon} alt="icon" />}
      <input
        className={styles["container"]}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Textbox;
