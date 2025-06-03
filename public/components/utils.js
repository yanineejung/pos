export const ConvertPriceToThaiBaht = (price) => {
  const formatted = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(price);
  return formatted;
};
