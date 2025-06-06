"use client";
import React from "react";
import { useState, useMemo } from "react";
import { debounce } from "../../utils";

const usePOS = ({ data }) => {
  const [result, setResult] = useState(data);
  const [open, setOpen] = useState(false);

  const filterProducts = (productList, searchText) => {
    if (!searchText) return productList;

    const lowerSearch = searchText.toLowerCase();

    return productList.filter(
      (product) =>
        product.productId.toLowerCase().includes(lowerSearch) ||
        product.productName.toLowerCase().includes(lowerSearch)
    );
  };
  const handleProductSearch = async (e) => {
    console.log(e.target.value);
    let res = await filterProducts(data, e.target.value);
    setResult(res);
  };

  // Memoized debounced version of the handler
  const debouncedProductSearch = useMemo(() => {
    return debounce(handleProductSearch, 500);
  }, []);

  return {
    // function
    debouncedProductSearch,
    // state
    result,
    open,
    setOpen,
  };
};

export default usePOS;
