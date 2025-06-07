"use client";
import styles from "./button.module.css";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button } from "antd";
const StepperButton = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className={styles["stepper-wrapper"]}>
      {/* <img
        className={styles["decreate-btn"]}
        src="/images/icons/minus.svg"
        onClick={() => onDecrement()}
      />
      {value}
      <img
        className={styles["increate-btn"]}
        src="/images/icons/plus.svg"
        onClick={() => onIncrement()}
      /> */}
      <Button
        className={styles["step-btn"]}
        icon={<MinusOutlined style={{ color: "white" }} />}
        onClick={onDecrement}
      />
      {value}

      <Button
        className={styles["step-btn"]}
        icon={<PlusOutlined style={{ color: "white" }} />}
        onClick={onIncrement}
      />
    </div>
  );
};
export default StepperButton;
