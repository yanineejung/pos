import dayjs from "dayjs";
import styles from "./template.module.css";
import EditableCardItem from "../organism/EditableCardItem";
import SummarySection from "../organism/SummarySection";
const CheckoutTemplate = () => {
  const date = dayjs(Date.now());
  const formattedDate = date.format("D/M/YYYY");
  const formattedTime = date.format("HH:mm");
  const item = {
    no: 2,
    productId: "G099191-TOP01",
    productName:
      "โต๊ะปรับระดับ รุ่น Health-Max Controller ขนาด 120*60 cm. | Ergonomic Adjustable Desk",
    category: "table",
    price: 17999,
    imageUrl:
      "https://www.bewellstyle.com/wp-content/uploads/2023/05/20230417_%E0%B8%9B%E0%B8%81_MKP_TBS04_03.jpg",
    stock: 10,
    number: 2,
    dcType: "baht",
    dcAmount: 5,
  };
  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["date-text"]}>
        <p>{`วันที่: ${formattedDate}`}</p>
        <p>{`| เวลา: ${formattedTime}`}</p>
      </div>
      <EditableCardItem item={item} />
      <SummarySection excludeVat={27340.14} vat={2057.86} point={0} />
    </div>
  );
};
export default CheckoutTemplate;
