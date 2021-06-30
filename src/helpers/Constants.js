export const baseUrl = "http://mrmart.co/";
export const mediaUrl = baseUrl + "images/";

export const formatPrice = Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumSignificantDigits: 21,
});

export const calculateDiscountedPrice = (originalPrice, discount) => {
  if (discount) {
    return Number.parseFloat(
      originalPrice - Number.parseFloat((originalPrice * discount) / 100)
    ).toFixed(2);
  }
  return originalPrice;
};

export const calculateDiscountAmount = (originalPrice, discount) => {
  if (discount) {
    return Number.parseFloat(
      Number.parseFloat((originalPrice * discount) / 100)
    ).toFixed(2);
  }
  return originalPrice;
};
