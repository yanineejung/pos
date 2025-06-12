"use client";
import { useState, useMemo } from "react";
import { message } from "antd";
import { debounce } from "../../utils";

/**
 * Custom React hook for managing Point of Sale (POS) logic, including product search, cart management,
 * discount application, and delayed product handling.
 *
 * @param {Object} params
 * @param {Array<Object>} params.data - The initial list of products available for sale.
 * @returns {Object} An object containing state variables and functions for POS operations:
 *   @property {Function} debouncedProductSearch - Debounced handler for product search input.
 *   @property {Function} setOpen - Setter for the open state (e.g., for modals or drawers).
 *   @property {Function} updateCartQuantity - Updates the quantity of a product in the cart.
 *   @property {Function} deleteProduct - Removes a product or its delayed/normal quantity from the cart.
 *   @property {Function} setModalOpen - Setter for the modal open state.
 *   @property {Function} setDelayedProduct - Setter for the currently selected delayed product.
 *   @property {Function} editProduct - Opens the modal to edit a product's delayed quantity.
 *   @property {Function} updateDelayedProduct - Updates the delayed quantity of a product in the cart.
 *   @property {Function} debouncedDiscount - Debounced handler for applying discounts to products.
 *   @property {Array<Object>} result - The current filtered list of products (search results).
 *   @property {boolean} open - State indicating if a modal or drawer is open.
 *   @property {Array<Object>} cart - The current list of products in the cart.
 *   @property {React.ReactNode} contextHolder - Context holder for message API (e.g., notifications).
 *   @property {boolean} modalOpen - State indicating if the delayed product modal is open.
 *   @property {Object} delayedProduct - The currently selected product for delayed handling.
 *   @property {Array<Object>} discount - The current list of discounts applied.
 */
const usePOS = ({ data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [result, setResult] = useState(data);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [delayedProduct, setDelayedProduct] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [discount, setDiscount] = useState([]);

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
    let res = await filterProducts(data, e?.target?.value);
    setResult(res);
  };

  const debouncedProductSearch = useMemo(() => {
    return debounce(handleProductSearch, 500);
  }, []);

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
          delete item.dcAmountDelay;
          delete item.dcTypeDelay;
        }
      } else {
        // Remove normal quantity
        if (item.quantity && item.quantity > 0) {
          item.quantity = 0;
          delete item.dcAmount;
          delete item.dcType;
        }
      }

      // Remove product entirely if both quantities are 0 or undefined
      const remainingQty = (item.quantity ?? 0) + (item.delayQuantity ?? 0);
      if (remainingQty === 0) {
        cartCopy.splice(index, 1);
      }
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

  const onDiscount = (product, dcType, dcAmount, isDelayed) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.productId === product.productId) {
          if (isDelayed) {
            return {
              ...item,
              dcTypeDelay: dcType,
              dcAmountDelay: dcAmount,
            };
          } else {
            return {
              ...item,
              dcType,
              dcAmount,
            };
          }
        }
        return item;
      })
    );
    console.log(" product ", product);
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
    discount,
  };
};

export default usePOS;
