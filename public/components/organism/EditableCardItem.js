import Text from "../atom/text/text";
import StepperButton from "../molecule/Button/StepperButton";
import styles from "./organism.module.css";

const EditableCardItem = ({ item }) => {
  return (
    <div className={styles["editable-item-container"]}>
      <div className={styles["info-section"]}>
        <img
          src={item?.imageUrl}
          style={{ width: "100px", aspectRatio: "1/1", borderRadius: "16px" }}
        />
        <div>
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
        <StepperButton value={item?.number} />
        <select>
          <option value="baht">บาท(฿)</option>
          <option value="percent">เปอร์เซ็นต์(%)</option>
        </select>
      </div>
    </div>
  );
};
export default EditableCardItem;
