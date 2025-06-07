"use client";
import { useState, useEffect } from "react";
import Text from "../../atom/Text/text";
import IconButton from "../Button/IconButton";
import StepperButton from "../Button/StepperButton";
import { Modal } from "antd";
import styles from "./modal.module.css";
const EditProductModal = ({ item, open, onClose, onOk }) => {
  const [delayedQyt, setDelayedQyt] = useState(item?.delayQuantity || 0);
  console.log("@ Edit modal ", delayedQyt);
  // Reset delayedQyt whenever the modal opens
  useEffect(() => {
    if (open) {
      setDelayedQyt(item?.delayQuantity || 0);
    }
  }, [open, item]);
  const maxQty = item?.quantity ?? 0;
  return (
    <Modal
      title="ต้องการส่งตามหลัง"
      open={open}
      closable
      onCancel={onClose}
      onOk={() => onOk(item, delayedQyt)}
      zIndex={2000}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <div className={styles["editable-item-container"]}>
        <div className={styles["info-section"]}>
          <img
            src={item?.imageUrl}
            style={{ width: "100px", aspectRatio: "1/1", borderRadius: "16px" }}
          />
          <div className={styles["product-info-wrapper"]}>
            <Text
              title={item?.productName}
              text={item?.productName}
              type="product-name-text"
            />
            <Text text={item?.productId} type="product-id-text" />
          </div>
        </div>
        <div className={styles["bottom-section"]}>
          <Text
            text={item?.price?.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            type="product-price-text"
            style={{ textAlign: "left" }}
          />
          <StepperButton
            value={delayedQyt}
            // onDecrement={() => console.log("decrease")}
            // onIncrement={() => console.log("increase")}
            onDecrement={() => setDelayedQyt(Math.max(0, delayedQyt - 1))}
            onIncrement={() => setDelayedQyt(Math.min(maxQty, delayedQyt + 1))}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
