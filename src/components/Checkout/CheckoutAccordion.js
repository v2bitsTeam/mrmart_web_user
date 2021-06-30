import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Divider from "@material-ui/core/Divider";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import PaymentOptions from "./PaymentOptions";
import OrderSummary from "./OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import { useCartUpdate } from "../../contexts/CartContext";
import fetchCartItems from "../CartScreen/fetchCartItems";

const CheckoutAccordion = ({
  user,
  location,
  setLocation,
  deliveryInstructions,
  setDeliveryInstructions,
  paymentMethod,
  setPaymentMethod,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const accordions = [
    {
      title: "Delivery Address",
      detail: (
        <DeliveryAddress
          location={location}
          setLocation={setLocation}
          deliveryInstructions={deliveryInstructions}
          setDeliveryInstructions={setDeliveryInstructions}
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
      ),
    },
    {
      title: "Order Summary",
      detail: (
        <OrderSummary
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
      ),
    },
    {
      title: "Payment Options",
      detail: (
        <PaymentOptions
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      ),
    },
  ];
  const [expanded, setExpanded] = useState(accordions[0].title);
  const updateCart = useCartUpdate();

  useEffect(() => {
    let mounted = true;

    async function getCartItems(userId) {
      const cartItems = await fetchCartItems(userId);
      if (mounted) updateCart(cartItems);
    }
    getCartItems(user.uid);

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={classes.checkoutAccordion}>
      {accordions.map((accordion, index) => {
        return (
          <Accordion
            expanded={expanded === accordion.title}
            onChange={handleChange(accordion.title)}
            key={accordion.title}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                className={classes.heading}
                variant="h6"
                component="h1"
              >
                {accordion.title}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className={classes.accordionDetail}>
              {accordion.detail}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default CheckoutAccordion;

const useStyles = makeStyles((theme) => ({
  checkoutAccordion: {
    width: "60%",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      width: "65%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingBottom: "6vh",
    },
  },
  accordionDetail: {
    display: "block",
  },
}));
