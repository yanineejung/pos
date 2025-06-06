"use client";
import React from "react";
import Product from "../molecule/Card/ProductCard";
import Textbox from "../molecule/Textbox/Textbox";
import { Row, Col, Empty } from "antd";
import styles from "./template.module.css";

const ProductTemplate = ({ itemList }) => {
  return (
    <>
      {/* <Textbox
        placeholder="พิมพ์ชื่อ หรือ รหัสสินค้าเพื่อค้นหา"
        icon={"/images/icons/search.svg"}
      /> */}

      {/* TODO: add section No result */}
      {itemList.length > 0 ? (
        <div className={styles["product-container"]}>
          {itemList?.map((item) => (
            <Product key={item?.no} item={item} />
          ))}
        </div>
      ) : (
        <div
          className={styles["product-container"]}
          style={{ alignItems: "center", height: "100%" }}
        >
          <Empty />
        </div>
      )}
    </>
  );
};

export default ProductTemplate;
