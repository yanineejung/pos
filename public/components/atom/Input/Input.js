import styles from "./input.module.css";
const Input = ({ placeholder, onChange, icon }) => {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        className={styles["container"]}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
