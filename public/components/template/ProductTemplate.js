import React from "react";
import Product from "../molecule/Card/ProductCard";
import Textbox from "../molecule/Textbox/Textbox";
import styles from "./template.module.css";

const ProductTemplate = ({ itemList }) => {
  return (
    <>
      <Textbox
        placeholder="พิมพ์ชื่อ หรือ รหัสสินค้าเพื่อค้นหา"
        icon={"/images/icons/search.svg"}
      />

      <div className={styles["product-container"]}>
        {itemList?.map((item) => (
          <Product key={item?.no} item={item} />
        ))}
      </div>
    </>
  );
};

export default ProductTemplate;
