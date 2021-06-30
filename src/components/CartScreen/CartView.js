import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import ShoppingCart from "./ShoppingCart";
import OrderValue from "./OrderValue";
import { useCartUpdate } from "../../contexts/CartContext";
import fetchCartItems from "./fetchCartItems";

const CartView = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("userDetails"));
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

  return (
    <div className={classes.wrapper}>
      <Box className={classes.cartview}>
        <ShoppingCart
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
        <OrderValue />
      </Box>
    </div>
  );
};

export default CartView;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "12vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cartview: {
    width: "80%",
    height: "100%",
    flex: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "95%",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));
