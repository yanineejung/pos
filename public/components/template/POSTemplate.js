"use client";
import Topbar from "../molecule/Layout/Topbar";
import Textbox from "../molecule/Textbox/Textbox";
import ProductTemplate from "./ProductTemplate";
import CheckoutTemplate from "./CheckoutTemplate";
import usePOS from "./hooks/usePOS";
export default function POSTemplate({ data }) {
  // console.log(MockData.productList);
  const { debouncedProductSearch, result } = usePOS({ data });
  return (
    <>
      <Textbox
        placeholder="พิมพ์ชื่อ หรือ รหัสสินค้าเพื่อค้นหา"
        icon={"/images/icons/search.svg"}
        onChange={(e) => debouncedProductSearch(e)}
      />
      <ProductTemplate itemList={result} />
      <div
      //   className={styles["checkout-section"]}
      >
        <CheckoutTemplate />
      </div>
    </>
  );
}
