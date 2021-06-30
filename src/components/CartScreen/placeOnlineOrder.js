import { postData } from "../../helpers/MakeNetworkCall";
import { baseUrl } from "../../helpers/Constants";
import logoOrange from "../../assets/images/logo-orange.png";

async function initializeRazorpayOrder(
  uid,
  amount,
  location,
  city,
  state,
  pincode,
  instructions
) {
  const formData = new FormData();

  formData.append("user_id", uid);
  formData.append("amount", amount);
  formData.append("location", location);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("pincode", pincode);
  formData.append("instructions", instructions);

  const response = await postData(
    baseUrl + "initialize_razorpay_order.php",
    formData
  );

  return response;
}

async function makePaymentRazorpay(
  total,
  userId,
  userName,
  userMobile,
  orderId,
  setOrderPlaced,
  updateSnackBar
) {
  const paymentOptions = {
    key: process.env.REACT_APP_RAZORPAY_LIVE_API_KEY,
    order_id: orderId,
    amount: total * 100,
    currency: "INR",
    name: "MR MART",
    description: "Best place to buy stuff online",
    image: logoOrange,
    theme: {
      color: "#ff5722",
      hide_topbar: false,
    },
    prefill: {
      name: userName,
      contact: userMobile,
    },
    notes: {
      address:
        "1ST FLOOR, SHANGRILA PLAZA, ROAD NO.2 , BANJARA HILLS, Hyderabad.",
    },

    handler: async function (response) {
      const result = await handlePaymentSuccess(response, total, userId);

      if (result.status) {
        localStorage.setItem("orderId", orderId);
        updateSnackBar(true, "Order placed successfully.", "success");
        setTimeout(() => setOrderPlaced(true), 1000);
      } else {
        updateSnackBar(
          true,
          "Something went wrong. Please, try again.",
          "error"
        );
      }
    },
  };

  let razorpayClient = new window.Razorpay(paymentOptions);

  razorpayClient.open();

  razorpayClient.on("payment.failed", (response) => {
    updateSnackBar(true, response.error.description, "error");
  });
}

async function handlePaymentSuccess(data, total, userId) {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("order_id", data.razorpay_order_id);
  formData.append("amount", total);
  formData.append("payment_id", data.razorpay_payment_id);
  formData.append("payment_signature", data.razorpay_signature);

  const response = await postData(baseUrl + "add_razorpay_order.php", formData);

  return response;
}

export { initializeRazorpayOrder, makePaymentRazorpay };
