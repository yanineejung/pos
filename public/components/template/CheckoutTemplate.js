"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styles from "./template.module.css";
import EditableCardItem from "../organism/EditableCardItem";
import SummarySection from "../organism/SummarySection";
const CheckoutTemplate = ({
  cart,
  updateCartQuantity,
  onDelete,
  onEdit,
  onDiscount,
}) => {
  const date = dayjs(Date.now());
  const formattedDate = date.format("D/M/YYYY");
  const formattedTime = date.format("HH:mm");
  const [cartTotals, setCartTotals] = useState({
    totalQuantity: 0,
    subtotal: 0,
    totalDiscount: 0,
    costExclVAT: 0,
    vat: 0,
    totalCost: 0,
  });

  // const item = {
  //   no: 2,
  //   productId: "G099191-TOP01",
  //   productName:
  //     "โต๊ะปรับระดับ รุ่น Health-Max Controller ขนาด 120*60 cm. | Ergonomic Adjustable Desk",
  //   category: "table",
  //   price: 17999,
  //   imageUrl:
  //     "https://www.bewellstyle.com/wp-content/uploads/2023/05/20230417_%E0%B8%9B%E0%B8%81_MKP_TBS04_03.jpg",
  //   stock: 10,
  //   number: 2,
  //   dcType: "baht",
  //   dcAmount: 5,
  // };
  const calculateCartTotals = (cartArray) => {
    let totalQuantity = 0;
    let subtotal = 0;
    let totalDiscount = 0;

    cartArray.forEach((item) => {
      const unitPrice = item.price ?? 0;
      const quantity = (item.quantity ?? 0) + (item.delayQuantity ?? 0);
      const itemSubtotal = unitPrice * quantity;

      let discount = 0;
      if (item.dcType === "baht") {
        discount = (item.dcAmount ?? 0) * quantity;
      } else if (item.dcType === "percent") {
        discount = (itemSubtotal * (item.dcAmount ?? 0)) / 100;
      }

      totalQuantity += quantity;
      subtotal += itemSubtotal;
      totalDiscount += discount;
    });

    // const costExclVAT = subtotal - totalDiscount;
    // const vat = costExclVAT * 0.07;
    // const totalCost = costExclVAT + vat;
    const costExclVAT = subtotal * 0.93;
    const vat = subtotal - costExclVAT;
    const totalCost = subtotal - totalDiscount;
    return {
      totalQuantity,
      subtotal, // before discount
      totalDiscount,
      costExclVAT,
      vat,
      totalCost,
    };
  };

  useEffect(() => {
    const totals = calculateCartTotals(cart);
    setCartTotals(totals);
  }, [cart]);
  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["date-text"]}>
        <p>{`วันที่: ${formattedDate}`}</p>
        <p>{`| เวลา: ${formattedTime}`}</p>
      </div>
      {cart?.length > 0 &&
        cart?.map((item) => {
          const normalQty = item.quantity || 0;
          const delayQty = item.delayQuantity || 0;
          return (
            <div>
              {normalQty > 0 && (
                <EditableCardItem
                  item={item}
                  onUpdate={updateCartQuantity}
                  onDelete={onDelete}
                  onEdit={() => onEdit(item)}
                  isDelayed={false}
                  onDiscount={onDiscount}
                />
              )}
              {delayQty > 0 && (
                <EditableCardItem
                  item={item}
                  onUpdate={updateCartQuantity}
                  onDelete={onDelete}
                  onEdit={() => onEdit(item)}
                  isDelayed={true}
                  onDiscount={onDiscount}
                />
              )}
            </div>
          );
        })}

      <SummarySection
        cartTotals={cartTotals}
        excludeVat={cartTotals?.subtotal}
        vat={cartTotals?.vat}
        point={0}
      />
    </div>
  );
};
export default CheckoutTemplate;
