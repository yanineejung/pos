"use client";
import { useState } from "react";
import Text from "../atom/Text/text";
// import Select from "../atom/Select/Select";
import StepperButton from "../molecule/Button/StepperButton";
import IconButton from "../molecule/Button/IconButton";
// import Textbox from "../molecule/Textbox/Textbox";
// import Input from "../atom/Input/Input";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tag, Select, InputNumber } from "antd";
import styles from "./organism.module.css";

const EditableCardItem = ({
  item,
  onUpdate,
  onDelete,
  onEdit,
  isDelayed,
  normalQyt,
  delayedQyt,
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
          <Select options={dcOptions} onChange={(e) => setDcType(e)} />
          <InputNumber min={0} onChange={(e) => onDiscount(item, dcType, e)} />
        </div>
      </div>
    </div>
  );
};
export default EditableCardItem;
