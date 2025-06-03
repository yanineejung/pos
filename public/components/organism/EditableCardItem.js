import Text from "../atom/Text/text";
import Select from "../atom/Select/Select";
import StepperButton from "../molecule/Button/StepperButton";
import IconButton from "../molecule/Button/IconButton";
// import Textbox from "../molecule/Textbox/Textbox";
import Input from "../atom/Input/Input";
import styles from "./organism.module.css";

const EditableCardItem = ({ item }) => {
  const dcOptions = [
    { label: "บาท(฿)", value: "baht" },
    { label: "เปอร์เซ็นต์(%)", value: "percent" },
  ];
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
          <IconButton icon="/images/icons/delivery-truck-speed.svg" />
          <IconButton icon="/images/icons/edit.svg" />
          <IconButton icon="/images/icons/delete.svg" />
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
        <StepperButton value={item?.number} />
        <div className={styles["discount-wrapper"]}>
          <Text text="ส่วนลด" style={{ marginBlock: "10px" }} />
          <Select options={dcOptions} />
          <Input />
        </div>
      </div>
    </div>
  );
};
export default EditableCardItem;
