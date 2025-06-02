import styles from "./button.module.css";

const StepperButton = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className={styles["stepper-wrapper"]}>
      <img className={styles["decreate-btn"]} src="/images/icons/minus.svg" />
      {value}
      <img className={styles["increate-btn"]} src="/images/icons/plus.svg" />
    </div>
  );
};
export default StepperButton;
