import styles from "./select.module.css";
const Select = ({ labelText, options, onChange }) => {
  return (
    <>
      {labelText ?? <p className={styles["label-text"]}>{labelText}</p>}
      <select className={styles["container"]} onChange={onChange}>
        {options?.map((item) => {
          return (
            <option
              key={item?.value}
              className={styles["opition-container"]}
              value={item?.value}
            >
              {item?.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
