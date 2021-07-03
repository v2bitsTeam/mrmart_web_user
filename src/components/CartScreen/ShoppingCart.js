import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { useCart } from "../../contexts/CartContext";
import CartItem from "./CartItem";
import noProductFound from "../../assets/images/nothing-found.png";
import { fonts } from "../../helpers/BaseStyles";

const ShoppingCart = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const cart = useCart();

  return (
    <Box component="span" className={classes.shopCartWrapper}>
      <Box className={classes.shopCart}>
        <div className={classes.titlebar}>
          <Typography
            variant="h4"
            gutterBottom
            className={classes.cartTextTitle}
          >
            Shopping Cart
            <div className={classes.stylizedUnderline}></div>
          </Typography>
          <div className={classes.minimumOrderContainer}>
            <Hidden smDown>
              <LocalShippingIcon fontSize="large" />
            </Hidden>
            <Typography
              variant="caption"
              gutterBottom
              className={classes.minimumOrderText}
            >
              Minimum Order Value
              <span className={classes.minimumOrderPrice}>Rs. 1,000</span>
            </Typography>
          </div>
        </div>
        <Divider />
        <List className={classes.cartItemGroup}>
          {cart ? (
            cart.map((cartItem) => (
              <CartItem
                item={cartItem}
                key={cartItem.id}
                updateSnackbarStatus={updateSnackbarStatus}
                updateSnackbarMessage={updateSnackbarMessage}
                updateSnackbarSeverity={updateSnackbarSeverity}
              />
            ))
          ) : (
            <div className={classes.noProductsFound}>
              <img
                alt={"No product found"}
                src={noProductFound}
                className={classes.noProductFoundImage}
              />
              <Typography
                className={classes.noProductFoundText}
                gutterBottom
                variant="h6"
                component="h4"
              >
                Nothing in Cart
              </Typography>
            </div>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ShoppingCart;

const useStyles = makeStyles((theme) => ({
  titlebar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartTextTitle: {
    fontFamily: "Zen Dots, cursive",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
  minimumOrderContainer: {
    width: "180px",
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    background: "#333",
    color: "#fff",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      gap: "0.2rem",
      padding: "0.5rem 0.5rem",
    },
  },
  minimumOrderText: {
    color: "#dfdfdf",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
  },
  minimumOrderPrice: {
    color: "#fff",
    fontWeight: fonts.bold,
    display: "block",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  shopCartWrapper: {
    marginTop: "4vh",
    marginBottom: "4vh",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    width: "65%",
    borderRadius: "5px 5px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "6vh",
      alignSelf: "center",
      width: "100%",
      marginBottom: "14vh",
    },
    [theme.breakpoints.down("xs")]: {
      // marginTop: "18vh",
      marginBottom: "14vh",
    },
  },
  shopCart: {
    borderRadius: "10px 10px",
    padding: "1.4rem",
    height: "fit-content",
  },
  cartTitle: {
    borderRadius: "5px 5px",
    padding: ".5rem 1rem",
    marginBottom: ".5rem",
  },
  noProductsFound: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  noProductFoundImage: {
    height: "30vh",
  },
  noProductFoundText: {
    paddingTop: "1rem",
  },
}));
