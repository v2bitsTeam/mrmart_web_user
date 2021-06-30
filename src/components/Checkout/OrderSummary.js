import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import CartItem from "../CartScreen/CartItem";
import { useCart } from "../../contexts/CartContext";

const OrderSummary = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const cart = useCart();

  return (
    <Box className={classes.shopCart}>
      <List className={classes.cartItemGroup}>
        {cart &&
          cart.map((cartItem) => (
            <CartItem
              item={cartItem}
              key={cartItem.id}
              updateSnackbarStatus={updateSnackbarStatus}
              updateSnackbarMessage={updateSnackbarMessage}
              updateSnackbarSeverity={updateSnackbarSeverity}
            />
          ))}
      </List>
    </Box>
  );
};

export default OrderSummary;

const useStyles = makeStyles((theme) => ({
  shopCart: {
    height: "fit-content",
    width: "100%",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      width: "98%",
    },
  },
  cartItemGroup: {
    width: "100%",
  },
}));
