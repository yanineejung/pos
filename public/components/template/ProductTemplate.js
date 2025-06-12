"use client";
import React from "react";
import Product from "../molecule/Card/ProductCard";
import { Empty } from "antd";
import styles from "./template.module.css";

/**
 * Renders a list of Product components or an Empty component if the list is empty.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.itemList - The list of product items to display.
 * @param {Function} props.onClick - Callback function invoked when a product is clicked. Receives the item and the action ("increase") as arguments.
 * @returns {JSX.Element} The rendered product list or an empty state.
 */
const ProductTemplate = ({ itemList, onClick }) => {
  return (
    <>
      {itemList.length > 0 ? (
        <div className={styles["product-container"]}>
          {itemList?.map((item) => (
            <Product
              key={item?.no}
              item={item}
              onClick={(item) => onClick(item, "increase")}
            />
          ))}
        </div>
      ) : (
        <div
          className={styles["product-container"]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Empty />
        </div>
      )}
    </>
  );
};

export default ProductTemplate;
