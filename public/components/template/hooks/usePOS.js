"use client";
import React from "react";
import { useState, useMemo } from "react";
import { debounce } from "../../utils";
import { message } from "antd";
const usePOS = ({ data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [result, setResult] = useState(data);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [delayedProduct, setDelayedProduct] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const addSuccess = () => {
    console.log("addSuccess");

    messageApi.open({
      type: "success",
      content: "เพิ่มสินค้าลงตระกร้า",
    });
  };
  const removeSuccess = () => {
    console.log("addSuccess");

    messageApi.open({
      type: "success",
      content: "นำสินค้าออกจากตระกร้า",
    });
  };
  const outOfStock = () => {
    console.log("outOfStock");
    messageApi.open({
      type: "error",
      content: "สินค้าหมด",
    });
  };
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

  const debouncedProductSearch = useMemo(() => {
    return debounce(handleProductSearch, 500);
  }, []);

  // const addToCart = (product) => {
  //   const cartCopy = [...cart]; // assuming cart is from state
  //   const existingItemIndex = cartCopy.findIndex(
  //     (item) => item.productId === product.productId
  //   );
  //   if (existingItemIndex !== -1) {
  //     cartCopy[existingItemIndex].quantity += 1;
  //   } else {
  //     cartCopy.push({
  //       ...product,
  //       quantity: 1,
  //       readyToDeliver: 1,
  //     });
  //   }
  //   setCart(cartCopy);
  //   success();
  // };

  const updateCartQuantity = (product, action) => {
    let productId = product?.productId;
    let stock = product?.stock;
    console.log("updateCartQuantity ", product);

    const cartCopy = [...cart];
    const index = cartCopy.findIndex((item) => item.productId === productId);
    if (index === -1) {
      cartCopy.push({
        ...product,
        quantity: 1,
        delayQuantity: 0,
      });
      addSuccess();
    } // Product not found

    const currentQty = cartCopy[index]?.quantity;

    if (action === "increase") {
      if (currentQty < stock) {
        cartCopy[index].quantity += 1;
        addSuccess?.();
      } else if (currentQty >= stock) {
        outOfStock?.(); // if you want to notify
      }
    } else if (action === "decrease") {
      if (currentQty > 1) {
        cartCopy[index].quantity -= 1;
      } else {
        // Remove item if quantity would be 0
        cartCopy.splice(index, 1);
      }
      removeSuccess?.();
      console.log("increase ");
    }

    setCart(cartCopy);
    // console.log(cartCopy);
  };

  // const deleteProduct = (product) => {
  //   const productId = product?.productId;
  //   if (!productId) return;

  //   const cartCopy = [...cart];
  //   const index = cartCopy.findIndex((item) => item.productId === productId);

  //   if (index !== -1) {
  //     cartCopy.splice(index, 1); // remove item
  //     setCart(cartCopy); // update state
  //     removeSuccess?.(); // show toast/snackbar if needed
  //   } else {
  //     console.warn("Product not found in cart:", productId);
  //   }
  // };

  const deleteProduct = (product, isDelayed) => {
    const productId = product?.productId;
    if (!productId) return;

    const cartCopy = [...cart];
    const index = cartCopy.findIndex((item) => item.productId === productId);

    if (index !== -1) {
      const item = cartCopy[index];

      if (isDelayed) {
        // Remove delayed quantity
        if (item.delayQuantity && item.delayQuantity > 0) {
          item.delayQuantity = 0;
        }
      } else {
        // Remove normal quantity
        if (item.quantity && item.quantity > 0) {
          item.quantity = 0;
        }
      }

      // Remove product entirely if both quantities are 0 or undefined
      const remainingQty = (item.quantity ?? 0) + (item.delayQuantity ?? 0);
      if (remainingQty === 0) {
        cartCopy.splice(index, 1);
      }

      console.log(
        "isDelayed, delayQuantity,quantity, remainingQty ",
        isDelayed,
        item.delayQuantity,
        item.quantity,
        remainingQty
      );
      setCart(cartCopy);
      removeSuccess?.(); // Optional success feedback
    } else {
      console.warn("Product not found in cart:", productId);
    }
  };

  const editProduct = (product) => {
    setModalOpen(true);
    setDelayedProduct(product);
  };

  const updateDelayedProduct = (product, delayedQty) => {
    const productId = product?.productId;
    if (!productId || delayedQty == null || delayedQty < 0) {
      console.warn("Invalid product or delayedQty:", product, delayedQty);
      return;
    }

    const updatedCart = cart.map((item) => {
      if (item.productId !== productId) return item;

      const currentQty = item.quantity ?? 0;
      // const validDelayQty = Math.min(delayedQty, currentQty);
      const validDelayQty = delayedQty;

      return {
        ...item,
        delayQuantity: validDelayQty,
        quantity: currentQty - validDelayQty,
      };
    });

    setCart(updatedCart);
    setModalOpen(false);
  };

  const onDiscount = (product, dcType, dcAmount) => {
    console.log(" discount ", product, dcType, dcAmount);
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.productId === product.productId) {
          return {
            ...item,
            dcType,
            dcAmount,
          };
        }
        return item;
      })
    );
  };

  const debouncedDiscount = useMemo(() => {
    return debounce(onDiscount, 500);
  }, []);

  return {
    // function
    debouncedProductSearch,
    setOpen,
    updateCartQuantity,
    deleteProduct,
    setModalOpen,
    setDelayedProduct,
    editProduct,
    updateDelayedProduct,
    debouncedDiscount,
    // state
    result,
    open,
    cart,
    contextHolder,
    modalOpen,
    delayedProduct,
  };
};

export default usePOS;
