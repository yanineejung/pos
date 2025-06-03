import Text from "../atom/Text/text";
import Select from "../atom/Select/Select";
import Input from "../atom/Input/Input";
import Button from "../molecule/Button/Button";
import { ConvertPriceToThaiBaht } from "../utils";
import styles from "./organism.module.css";
const SummarySection = ({ excludeVat, vat, point }) => {
  const dcOptions = [
    { label: "บาท(฿)", value: "baht" },
    { label: "เปอร์เซ็นต์(%)", value: "percent" },
  ];
  return (
    <div className={styles["summary-container"]}>
      <Text text="สรุปยอด" type="heading3" />
      <div className={styles["text-wrapper"]}>
        <Text text="ราคา" type="heading5" />
        <Text text={ConvertPriceToThaiBaht(excludeVat)} type="heading5" />
      </div>
      <div className={styles["text-wrapper"]}>
        <Text text="รวม Vat 7%" type="heading5" />
        <Text text={ConvertPriceToThaiBaht(vat)} type="heading5" />
      </div>
      <div className={styles["text-wrapper"]}>
        <Text text="ส่วนลดท้ายบิล" type="heading5" />
        <div className={styles["discount-wrapper"]}>
          <Text text="กรอกส่วนลดท้ายบิล" style={{ marginBlock: "10px" }} />
          <Select options={dcOptions} />
          <Input />
        </div>
      </div>
      <div className={styles["text-wrapper"]}>
        <Text text="จำนวนสินค้า" type="heading5" />
        <Text text="2 รายการ" type="heading5" />
      </div>
      <div className={styles["text-wrapper"]}>
        <Text text="แลกคะแนน" type="heading5" />
        <Text text={point ?? 0} type="heading5" />
      </div>
      <div className={styles["text-wrapper"]}>
        <Text text="ยอดรวมสุทธิ" type="heading5" />
        <Text text={ConvertPriceToThaiBaht(27898)} type="heading5" />
      </div>
      <Button text="ยกเลิก" type="secondary-btn" />
      <Button text="ชำระเงิน" type="primary-btn" />
    </div>
  );
};

export default SummarySection;
