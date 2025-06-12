"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styles from "./template.module.css";
import EditableCardItem from "../organism/EditableCardItem";
import SummarySection from "../organism/SummarySection";

/**
 * CheckoutTemplate component displays the checkout page, including the list of cart items,
 * date/time, and a summary section with calculated totals, discounts, and VAT.
 *
 * @component
 * @param {Object[]} cart - Array of cart item objects.
 * @param {function} updateCartQuantity - Callback to update the quantity of a cart item.
 * @param {function} onDelete - Callback to delete a cart item.
 * @param {function} onEdit - Callback to edit a cart item.
 * @param {function} onDiscount - Callback to apply a discount to a cart item.
 *
 * @returns {JSX.Element} The rendered checkout template.
 */
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
    dcTotalType: "baht",
    dcTotalAmount: 0,
  });

  const calculateCartTotals = (cartArray) => {
    let totalQuantity = 0;
    let subtotal = 0;
    let totalDiscount = 0;

    for (const item of cartArray) {
      const unitPrice = item.price ?? 0;
      const quantity = item.quantity ?? 0;
      const delayedQuantity = item.delayQuantity ?? 0;

      const itemSubtotal = unitPrice * quantity;
      const itemDelayedSubtotal = unitPrice * delayedQuantity;

      subtotal += itemSubtotal + itemDelayedSubtotal;
      totalQuantity += quantity + delayedQuantity;

      // Calculate discount for immediate items
      if (item.dcType) {
        const amount = item.dcAmount ?? 0;
        totalDiscount +=
          item.dcType === "baht" ? amount : itemSubtotal * (amount / 100);
      }

      // Calculate discount for delayed items
      if (item.dcTypeDelay) {
        const amountDelay = item.dcAmountDelay ?? 0;
        totalDiscount +=
          item.dcTypeDelay === "baht"
            ? amountDelay
            : itemDelayedSubtotal * (amountDelay / 100);
      }
    }

    const costExclVAT = subtotal * 0.93;
    const vat = subtotal - costExclVAT;
    const totalCost = subtotal - totalDiscount;

    return {
      totalQuantity,
      subtotal, // Before discount
      totalDiscount,
      costExclVAT,
      vat,
      totalCost,
    };
  };

  const calculateTotals = (totals) => {
    if (!totals) return null;

    let extraDiscount = 0;

    if (totals.dcTotalType) {
      const amount = totals.dcTotalAmount ?? 0;

      extraDiscount =
        totals.dcTotalType === "baht"
          ? amount
          : totals.totalCost * (amount / 100);
    }

    const finalTotalCost = totals.totalCost - extraDiscount;

    return {
      ...totals,
      dcTotalAmount: extraDiscount,
      totalCost: finalTotalCost,
    };
  };

  useEffect(() => {
    const totals = calculateCartTotals(cart);
    setCartTotals(totals);
    // const finalTotals = calculateTotals(totals);
    // setCartTotals(finalTotals ?? totals); // Use finalTotals if valid
  }, [cart]);

  return (
    <>
      <div className={styles["checkout-container"]}>
        <div className={styles["product-list"]}>
          <div className={styles["date-text"]}>
            <p>{`วันที่: ${formattedDate}`}</p>
            <p>{`| เวลา: ${formattedTime}`}</p>
          </div>
          {cart?.length > 0 &&
            cart?.map((item) => {
              const normalQty = item.quantity || 0;
              const delayQty = item.delayQuantity || 0;
              return (
                <div key={item?.productId}>
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
        </div>
        <div className={styles["summary-container"]}>
          <SummarySection
            cartTotals={cartTotals}
            excludeVat={cartTotals?.subtotal}
            vat={cartTotals?.vat}
            point={0}
          />
        </div>
      </div>
    </>
  );
};
export default CheckoutTemplate;
