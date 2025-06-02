import React from "react";
import styles from "./card.module.css";
import Tag from "../../atom/text/Tag/Tags";
import Text from "../../atom/text/text";

const Product = ({ item, onClick }) => {
  return (
    <div className={styles["product-card-container"]}>
      <div
        style={{
          backgroundImage: `url(${item?.imageUrl})`,
        }}
        className={styles["image-container"]}
      >
        <div className={styles["add-cart-btn"]} onClick={onClick}>
          <img
            className={styles["add-cart-icon"]}
            src={"/images/icons/add-shopping-cart.svg"}
          />
        </div>
      </div>
      <Text text={item?.productName} type="product-name-text" />
      <Text text={item?.productId} type="product-id-text" />
      <div>
        <Tag text={item?.category} />
        <Text
          text={item?.price?.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          type="product-price-text"
        />
      </div>
    </div>
  );
};

export default Product;
