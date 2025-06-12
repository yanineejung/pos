"use client";
import { useState, useEffect } from "react";

import { Modal } from "antd";
import Text from "../../atom/Text/text";
import StepperButton from "../Button/StepperButton";

import styles from "./modal.module.css";

/**
 * EditProductModal component allows editing the delayed quantity of a product in a modal dialog.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.item - The product item to edit.
 * @param {string} [props.item.productId] - The product's unique identifier.
 * @param {string} [props.item.productName] - The product's name.
 * @param {string} [props.item.imageUrl] - The URL of the product's image.
 * @param {number} [props.item.price] - The price of the product.
 * @param {number} [props.item.quantity] - The available quantity of the product.
 * @param {number} [props.item.delayQuantity] - The initial delayed quantity.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {Function} props.onClose - Callback when the modal is closed.
 * @param {Function} props.onOk - Callback when the modal is confirmed. Receives the item and the delayed quantity as arguments.
 *
 * @returns {JSX.Element} The rendered EditProductModal component.
 */
const EditProductModal = ({ item, open, onClose, onOk }) => {
  const [delayedQyt, setDelayedQyt] = useState(item?.delayQuantity || 0);

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
            onDecrement={() => setDelayedQyt(Math.max(0, delayedQyt - 1))}
            onIncrement={() => setDelayedQyt(Math.min(maxQty, delayedQyt + 1))}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
