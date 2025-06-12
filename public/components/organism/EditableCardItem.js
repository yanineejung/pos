"use client";
import { useState } from "react";

import { Tag, Select, InputNumber } from "antd";

import Text from "../atom/Text/text";
import StepperButton from "../molecule/Button/StepperButton";
import IconButton from "../molecule/Button/IconButton";
import { ClockCircleOutlined } from "@ant-design/icons";
import styles from "./organism.module.css";

/**
 * EditableCardItem component displays a product card with editable options such as quantity, discount, and actions.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.item - The product item data.
 * @param {Function} props.onUpdate - Callback when the quantity is updated. Receives (item, action).
 * @param {Function} props.onDelete - Callback when the item is deleted. Receives (item, isDelayed).
 * @param {Function} props.onEdit - Callback when the item is edited. Receives (item).
 * @param {boolean} props.isDelayed - Indicates if the item is delayed.
 * @param {Function} props.onDiscount - Callback when the discount is changed. Receives (item, dcType, value, isDelayed).
 *
 * @returns {JSX.Element} The rendered EditableCardItem component.
 */
const EditableCardItem = ({
  item,
  onUpdate,
  onDelete,
  onEdit,
  isDelayed,
  onDiscount,
}) => {
  const dcOptions = [
    { label: "บาท(฿)", value: "baht" },
    { label: "เปอร์เซ็นต์(%)", value: "percent" },
  ];

  const [dcType, setDcType] = useState("baht");
  return (
    <div className={styles["editable-item-container"]}>
      <div className={styles["info-section"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <img
              src={item?.imageUrl}
              style={{
                width: "100px",
                aspectRatio: "1/1",
                borderRadius: "16px",
              }}
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
          <div>
            <div className={styles["action-wrapper"]}>
              {isDelayed && (
                <Tag
                  icon={<ClockCircleOutlined />}
                  color="orange"
                  style={{ margin: "0px", padding: "2px 8px" }}
                >
                  ส่งตามหลัง
                </Tag>
              )}
              {!isDelayed && (
                <IconButton
                  icon="/images/icons/edit.svg"
                  onClick={() => onEdit(item)}
                />
              )}
              <IconButton
                icon="/images/icons/delete.svg"
                onClick={() => onDelete(item, isDelayed)}
              />
            </div>
          </div>
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
          value={isDelayed ? item?.delayQuantity : item?.quantity}
          onDecrement={() => onUpdate(item, "decrease")}
          onIncrement={() => onUpdate(item, "increase")}
        />
        <div className={styles["discount-wrapper"]}>
          <Text text="ส่วนลด" style={{ marginBlock: "4px" }} />
          <Select
            value={isDelayed ? item?.dcTypeDelay : item?.dcType}
            options={dcOptions}
            onChange={(e) => setDcType(e)}
          />
          <InputNumber
            min={0}
            onChange={(e) => onDiscount(item, dcType, e, isDelayed)}
            value={isDelayed ? item?.dcAmountDelay : item?.dcAmount}
          />
        </div>
      </div>
    </div>
  );
};
export default EditableCardItem;
