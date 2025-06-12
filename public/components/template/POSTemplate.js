"use client";
import { FloatButton, Drawer, Space, Button, Col, Input } from "antd";

import usePOS from "./hooks/usePOS";

import EditProductModal from "../molecule/Modal/EditProductModal";
import ProductTemplate from "./ProductTemplate";
import CheckoutTemplate from "./CheckoutTemplate";
import styles from "./template.module.css";
const { Search } = Input;

/**
 * POS (Point of Sale) Template component.
 * Renders the main POS interface including product search, product list, cart, checkout, and modals.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.data - The initial data for the POS system.
 * @returns {JSX.Element} The rendered POS template.
 */
export default function POSTemplate({ data }) {
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
            <Search
              placeholder="พิมพ์ชื่อ หรือ รหัสสินค้าเพื่อค้นหา"
              allowClear
              onChange={(e) => debouncedProductSearch(e)}
              onSearch={(e) => debouncedProductSearch(e)}
              style={{ marginBottom: "12px" }}
            />
            <ProductTemplate itemList={result} onClick={updateCartQuantity} />
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <CheckoutTemplate
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            onDelete={deleteProduct}
            onEdit={editProduct}
            onDiscount={debouncedDiscount}
          />
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
