import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import placeOrder from "../Checkout/placeOrder";
import { formatPrice, calculateDiscountAmount } from "../../helpers/Constants";
import { useCart } from "../../contexts/CartContext";
import { usePincodes } from "../../contexts/PincodesContext";
import Tooltip from "@material-ui/core/Tooltip";
import {
  initializeRazorpayOrder,
  makePaymentRazorpay,
} from "./placeOnlineOrder";

const OrderValue = ({
  isCheckOutPage,
  user,
  paymentMethod,
  location,
  deliveryInstructions,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const cart = useCart();
  const pincodes = usePincodes();
  const [subTotal, setSubTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function updateSnackBar(status, message, severity) {
    updateSnackbarStatus(false);
    setTimeout(() => updateSnackbarStatus(status), 0);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let mounted = true;
    setSubTotal(0);
    setDiscountAmount(0);

    cart &&
      cart.map((item) => {
        if (mounted) {
          setSubTotal(
            (currentSubTotal) => item.price * item.items + currentSubTotal
          );
          setDiscountAmount(
            (currentDiscount) =>
              calculateDiscountAmount(item.price, item.discount) * item.items +
              currentDiscount
          );
        }
        return 1;
      });

    return function cleanup() {
      mounted = false;
    };
  }, [cart]);

  useEffect(() => {
    let mounted = true;

    if (mounted) setTotal(parseFloat(subTotal - discountAmount));
    return function cleanup() {
      mounted = false;
    };
  }, [subTotal, discountAmount]);

  async function handleCheckOut() {
    if (!cart) {
      return;
    }
    if (!paymentMethod) {
      updateSnackBar(true, "Payment method is required.", "error");
      return;
    }
    let selectedLocation = location ? location : user.location;
    let selectedCity = pincodes?.userPincode.address;
    let selectedState = user.state;
    let selectedPincode = pincodes?.userPincode.pincode;

    if (paymentMethod === "Online") {
      const response = await initializeRazorpayOrder(
        user.uid,
        total,
        selectedLocation,
        selectedCity,
        selectedState,
        selectedPincode,
        deliveryInstructions
      );

      if (response.status) {
        makePaymentRazorpay(
          total.toString(),
          user.uid,
          user.name,
          user.mobile,
          response.order_id,
          setOrderPlaced,
          updateSnackBar
        );
      } else {
        updateSnackBar(
          true,
          "Something went wrong. Please, try again.",
          "error"
        );
      }
      return;
    }
    const formData = new FormData();
    formData.append("uid", user.uid);
    formData.append("amount", total);
    formData.append("delivery", "");
    formData.append(
      "payment_status",
      paymentMethod === "COD" ? "pending" : "paid"
    );
    formData.append("payment_type", paymentMethod);
    formData.append("location", selectedLocation);
    formData.append("city", selectedCity);
    formData.append("state", selectedState);
    formData.append("pincode", selectedPincode);
    formData.append("instructions", deliveryInstructions);
    const response = await placeOrder(formData);

    if (response.status) {
      localStorage.setItem("orderId", response.orderId);
      updateSnackBar(true, "Order placed successfully.", "success");
      setTimeout(() => setOrderPlaced(true), 1000);
      return;
    }
    updateSnackBar(true, "Something went wrong.", "error");
  }

  if (orderPlaced) {
    return <Redirect to="/order-placed" />;
  }

  return (
    <Box component="span" className={classes.orderBoxWrapper}>
      <Hidden smDown>
        <Card className={classes.orderValueCard}>
          <Typography component="h2" variant="h6">
            Price Details
          </Typography>
          <Divider />
          <Box className={classes.priceGroup}>
            <Typography
              className={classes.productSubTitles}
              variant="h6"
              component="h2"
            >
              Sub Total
            </Typography>
            <Typography
              className={classes.subTotalValue}
              variant="h6"
              component="span"
            >
              {formatPrice.format(subTotal)}
            </Typography>
          </Box>
          <Box className={classes.priceGroup}>
            <Typography
              className={classes.productSubTitles}
              variant="h6"
              component="h2"
            >
              Discount
            </Typography>
            <Typography
              className={classes.discountValue}
              variant="h6"
              component="span"
            >
              {formatPrice.format(discountAmount)}
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.priceGroup}>
            <Typography
              className={classes.productSubTitles}
              variant="h6"
              component="h2"
            >
              Total Amount
            </Typography>
            <Typography
              className={classes.totalValue}
              variant="h6"
              component="span"
            >
              {formatPrice.format(total)}
            </Typography>
          </Box>
          {isCheckOutPage ? (
            <Tooltip
              arrow
              title={
                !cart
                  ? "No items in cart!"
                  : !pincodes?.userPincode
                  ? "Please, Update your pincode to place order"
                  : total < 1000
                  ? "Minimum order value is Rs.1,000"
                  : ""
              }
              placement="top"
            >
              <span style={{ width: "100%" }}>
                <Button
                  className={classes.checkoutBtn}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCheckOut}
                  disabled={
                    !(total > 999 && cart && pincodes?.userPincode)
                      ? true
                      : false
                  }
                >
                  Proceed to Pay
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Tooltip
              arrow
              title={
                !cart
                  ? "No items in cart!"
                  : !pincodes?.userPincode
                  ? "Please, Update your pincode to place order"
                  : total < 1000
                  ? "Minimum order value is Rs.1,000"
                  : ""
              }
              placement="top"
            >
              <span style={{ width: "100%" }}>
                <Button
                  className={classes.checkoutBtn}
                  variant="contained"
                  color="primary"
                  size="large"
                  to="/checkout"
                  component={Link}
                  disabled={
                    !(total > 999 && pincodes?.userPincode) ? true : false
                  }
                >
                  Proceed to Pay
                </Button>
              </span>
            </Tooltip>
          )}
        </Card>
      </Hidden>
      <Hidden mdUp>
        <Card className={classes.totalCard}>
          <div className={classes.totalContainer}>
            <Typography
              className={classes.productSubTitles}
              variant="body1"
              component="h2"
            >
              Total Amount
            </Typography>
            <Typography
              variant="inherit"
              component="h2"
              className={classes.totalValue}
            >
              {formatPrice.format(total)}
            </Typography>
          </div>
          {isCheckOutPage ? (
            <Tooltip
              arrow
              title={
                !cart
                  ? "No items in cart!"
                  : !pincodes?.userPincode
                  ? "Please, Update your pincode to place order"
                  : total < 1000
                  ? "Minimum order value is Rs.1,000"
                  : ""
              }
              placement="top"
            >
              <span>
                <Button
                  className={classes.checkoutBtn}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCheckOut}
                  disabled={
                    !(total > 999 && cart && pincodes?.userPincode)
                      ? true
                      : false
                  }
                >
                  Proceed
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Tooltip
              arrow
              title={
                !cart
                  ? "No items in cart!"
                  : !pincodes?.userPincode
                  ? "Please, Update your pincode to place order"
                  : total < 1000
                  ? "Minimum order value is Rs.1,000"
                  : ""
              }
              placement="top"
            >
              <span>
                <Button
                  className={classes.checkoutBtn}
                  variant="contained"
                  color="primary"
                  size="large"
                  to={cart ? "/checkout" : "#"}
                  component={Link}
                  disabled={
                    !(total > 999 && cart && pincodes?.userPincode)
                      ? true
                      : false
                  }
                >
                  Proceed
                </Button>
              </span>
            </Tooltip>
          )}
        </Card>
      </Hidden>
    </Box>
  );
};

export default OrderValue;

const useStyles = makeStyles((theme) => ({
  orderBoxWrapper: {
    alignSelf: "flex-start",
    width: "25%",
    position: "sticky",
    top: "19vh",
    right: "10vh",
  },

  productSubTitles: {
    color: "#777",
  },
  orderValueCard: {
    padding: "0 2rem",
    height: "20rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  priceGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkoutBtn: {
    width: "100%",
    minWidth: "100px",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  totalCard: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    padding: "1rem 2rem",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 0,
    background: "#fafafa",
    boxShadow: "-4px 0 20px #3339",
  },
  totalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  discountValue: {
    fontSize: "1.2rem",
  },
  totalTitle: {
    color: "#777",
  },
  totalValue: {},
  proceedBtnWrapper: {
    textDecoration: "none",
  },
}));
