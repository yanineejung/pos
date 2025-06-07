"use client";
import Topbar from "../molecule/Layout/Topbar";
import Textbox from "../molecule/Textbox/Textbox";
import EditProductModal from "../molecule/Modal/EditProductModal";
import ProductTemplate from "./ProductTemplate";
import CheckoutTemplate from "./CheckoutTemplate";
import { FloatButton, Drawer, Space, Button, Row, Col } from "antd";
import styles from "./template.module.css";
import usePOS from "./hooks/usePOS";
export default function POSTemplate({ data }) {
  // console.log(MockData.productList);
  const {
    debouncedProductSearch,
    setOpen,
    updateCartQuantity,
    deleteProduct,
    setModalOpen,
    setDelayedProduct,
    editProduct,
    updateDelayedProduct,
    debouncedDiscount,
    result,
    open,
    cart,
    contextHolder,
    modalOpen,
    delayedProduct,
  } = usePOS({
    data,
  });
  return (
    <div>
      {contextHolder}
      <div className={styles["container"]}>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className={styles["main"]}>
            <Textbox
              placeholder="พิมพ์ชื่อ หรือ รหัสสินค้าเพื่อค้นหา"
              icon="/images/icons/search.svg"
              onChange={(e) => debouncedProductSearch(e)}
            />
            <ProductTemplate itemList={result} onClick={updateCartQuantity} />
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <div className={styles["checkout"]}>
            <CheckoutTemplate
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              onDelete={deleteProduct}
              onEdit={editProduct}
              onDiscount={debouncedDiscount}
            />
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
        <CheckoutTemplate
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          onDelete={deleteProduct}
          onEdit={editProduct}
          onDiscount={debouncedDiscount}
        />
      </Drawer>
      <EditProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onOk={updateDelayedProduct}
        item={delayedProduct}
      />
    </div>
  );
}
