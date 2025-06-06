"use client";
import Topbar from "../molecule/Layout/Topbar";
import Textbox from "../molecule/Textbox/Textbox";
import ProductTemplate from "./ProductTemplate";
import CheckoutTemplate from "./CheckoutTemplate";
import { FloatButton, Drawer, Space, Button, Row, Col } from "antd";
import styles from "./template.module.css";
import usePOS from "./hooks/usePOS";
export default function POSTemplate({ data }) {
  // console.log(MockData.productList);
  const { debouncedProductSearch, result, open, setOpen } = usePOS({ data });
  return (
    <div>
      <div className={styles["container"]}>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className={styles["main"]}>
            <Textbox
              placeholder="พิมพ์ชื่อ หรือ รหัสสินค้าเพื่อค้นหา"
              icon="/images/icons/search.svg"
              onChange={(e) => debouncedProductSearch(e)}
            />
            <ProductTemplate itemList={result} />
            {/* <div
          style={{ width: "100px", height: "100px", backgroundColor: "red" }}
        ></div> */}
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <div className={styles["checkout"]}>
            {/* <div
          style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
        ></div> */}
            <CheckoutTemplate />
          </div>
        </Col>
        <FloatButton
          shape="circle"
          type="primary"
          style={{ insetInlineEnd: 24 }}
          className={styles["responsive-icon"]}
          onClick={() => setOpen(true)}
          tooltip={{
            title: "ดูรายการสั่งซื้อ",
            color: "blue",
            placement: "top",
          }}
        />
      </div>
      <Drawer
        title="รายการสั่งซื้อ"
        placement={"bottom"}
        closable={false}
        height="70vh"
        onClose={() => setOpen(false)}
        open={open}
        key={"bottom"}
        size="large"
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>X</Button>
          </Space>
        }
      >
        <CheckoutTemplate />
      </Drawer>
    </div>
  );
}
