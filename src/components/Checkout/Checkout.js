import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CheckoutAccordion from "./CheckoutAccordion";
import OrderValue from "../CartScreen/OrderValue";

const Checkout = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const user = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" gutterBottom className={classes.checkoutTitle}>
        Checkout
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <Box className={classes.checkout}>
        <CheckoutAccordion
          user={user}
          location={location}
          setLocation={setLocation}
          deliveryInstructions={deliveryInstructions}
          setDeliveryInstructions={setDeliveryInstructions}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
        <OrderValue
          isCheckOutPage={true}
          user={user}
          paymentMethod={paymentMethod}
          location={location}
          deliveryInstructions={deliveryInstructions}
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
      </Box>
    </div>
  );
};

export default Checkout;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "18vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#f1f3f6",
    paddingBottom: "8vh",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "10vh",
    },
  },
  checkout: {
    width: "80%",
    flex: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  checkoutTitle: {
    width: "80%",
    fontFamily: "Zen Dots, cursive",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
}));
