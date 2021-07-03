import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import addToCart from "./addToCart";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import fetchCartItems from "../CartScreen/fetchCartItems";
import {
  mediaUrl,
  formatPrice,
  calculateDiscountedPrice,
} from "../../helpers/Constants";
import { useCart, useCartUpdate } from "../../contexts/CartContext";
import { usePincodes } from "../../contexts/PincodesContext";
import discountImage from "../../assets/images/discount.png";

const Product = ({
  product,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const pincodes = usePincodes();
  const cart = useCart();
  const updateCart = useCartUpdate();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const user = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    let mounted = true;

    if (user) getCartItems(user.uid);

    async function getCartItems(userId) {
      const cartItems = await fetchCartItems(userId);
      if (mounted) updateCart(cartItems);
    }

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cart) {
      checkIfItemIsInCart();
    }

    function checkIfItemIsInCart() {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].pid === product.pid) {
          setIsInCart(true);
          return;
        }
        setIsInCart(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  function updateSnackBar(status, message, severity) {
    updateSnackbarStatus(false);
    setTimeout(() => updateSnackbarStatus(status), 0);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  function updateQuantity(type) {
    if (type === "plus") {
      setQuantity(quantity + 1);
      return;
    }
    if (quantity === product.instock || quantity === 1) {
      updateSnackBar(
        true,
        quantity === 1
          ? "Minimum 1 product"
          : "Entered quantity exceeds avaialable units",
        "error"
      );
      return;
    }
    setQuantity(quantity - 1);
  }

  async function addItem() {
    const response = await addToCart(product.pid, user.uid, quantity);
    if (response.status) {
      const cartItems = await fetchCartItems(user.uid);
      updateCart(cartItems);
      updateSnackBar(true, "Product added to cart successfully", "success");
      return;
    }
    updateSnackBar(true, response.message, "error");
  }

  return (
    <Card className={classes.card}>
      <div className={classes.discountBlock}>
        {product.discount > 0 && (
          <>
            <img
              alt={"logo"}
              src={discountImage}
              className={classes.discountImage}
            />

            <Typography component="div" className={classes.discountValue}>
              {product.discount}%
            </Typography>
          </>
        )}
      </div>
      <Link
        to={{
          pathname: `/prod-details/${product.pid}`,
          state: { product },
        }}
        className={classes.productNameLink}
      >
        <CardMedia
          className={classes.productImage}
          component="img"
          image={mediaUrl + product.image}
          title={product.name}
        />
      </Link>
      <CardContent className={classes.productContent}>
        <Link
          to={{
            pathname: `/prod-details/${product.pid}`,
            state: { product },
          }}
          className={classes.productNameLink}
        >
          <Typography
            gutterBottom
            component="div"
            className={classes.productName}
          >
            {product.name}
          </Typography>
        </Link>
        <div className={classes.priceBlock}>
          <Typography
            className={classes.price}
            gutterBottom
            variant="h6"
            component="h4"
          >
            {formatPrice.format(
              calculateDiscountedPrice(product.price, product.discount)
            )}
          </Typography>
          {product.discount > 0 ? (
            <Typography
              className={classes.originalPrice}
              gutterBottom
              variant="body2"
              component="h4"
            >
              {formatPrice.format(product.price)}
            </Typography>
          ) : (
            <></>
          )}
        </div>

        <div className={classes.qtyBlock}>
          <IconButton
            variant="contained"
            // size="small"
            color="secondary"
            disabled={isInCart || !user || !pincodes?.userPincode}
            aria-label="remove quantity"
            onClick={() => updateQuantity("minus")}
          >
            <RemoveIcon />
          </IconButton>
          <input
            className={classes.qtyInput}
            disabled={true}
            value={quantity}
          />
          <IconButton
            color="primary"
            disabled={isInCart || !user || !pincodes?.userPincode}
            aria-label="add quatity"
            onClick={() => updateQuantity("plus")}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Tooltip
          arrow
          title={product.instock < 1 ? "Sorry, out of stock" : ""}
          placement="top"
        >
          <span>
            <Tooltip
              arrow
              title={
                !user
                  ? "Sign in to add to cart"
                  : !pincodes?.userPincode
                  ? "Please, update pincode to add item to cart"
                  : isInCart
                  ? "Item already in cart"
                  : ""
              }
              placement="top"
            >
              <span>
                <Button
                  size="large"
                  className={classes.cartBtn}
                  variant="contained"
                  color="primary"
                  onClick={addItem}
                  disabled={
                    isInCart ||
                    product.instock < 1 ||
                    !user ||
                    !pincodes?.userPincode
                  }
                >
                  {product.instock > 0 ? (
                    <>
                      <Hidden xsDown>
                        <ShoppingBasketIcon style={{ marginRight: "0.7rem" }} />{" "}
                        <Typography
                          className={classes.addToCartText}
                          variant="body2"
                          component="h4"
                        >
                          Add To Cart
                        </Typography>
                      </Hidden>
                      <Hidden smUp>
                        <ShoppingBasketIcon style={{ marginRight: "0.7rem" }} />{" "}
                        <Typography
                          className={classes.addToCartText}
                          variant="body2"
                          component="h4"
                        >
                          Add
                        </Typography>
                      </Hidden>
                    </>
                  ) : (
                    <>
                      <Hidden xsDown>Out Of Stock</Hidden>
                      <Hidden smUp>Out of Stock</Hidden>
                    </>
                  )}
                </Button>
              </span>
            </Tooltip>
          </span>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default Product;

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
    paddingTop: "0.6rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
      paddingTop: "0.6rem",
    },
  },
  discountBlock: {
    marginRight: "-1rem",
    position: "relative",
    width: "40px",
    height: "40px",
    alignSelf: "flex-end",
    cursor: "default",
  },
  discountImage: {
    width: "40px",
  },
  discountValue: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "0.7rem",
    fontWeight: "600",
    color: "#fff",
  },
  productImage: {
    alignSelf: "center",
    width: "200px",
    height: "160px",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      width: "140px",
      height: "100px",
    },
  },

  productContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.4rem",
    padding: 0,
    "&:last-child": {
      paddingBottom: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.2rem",

      "&:last-child": {
        paddingBottom: "0.4rem",
      },
    },
  },
  productNameLink: {
    textDecorationLine: "none",
  },
  productName: {
    textTransform: "capitalize",
    fontweight: "bold",
    fontSize: "1.2rem",
    color: "#111",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },

  priceBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    cursor: "default",
    [theme.breakpoints.down("sm")]: {
      gap: "0.4rem",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  originalPrice: {
    paddingLeft: "0.4rem",
    fontSize: "0.8rem",
    fontWeight: "600",
    textDecoration: "line-through",
    color: "#777c",
  },
  outOfStock: {
    color: "#d50000",
  },
  qtyBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0 0.25rem",
    background: "#eaeaea",
    borderRadius: "2rem",
  },
  qtyInput: {
    width: "3rem",
    height: "2.5rem",
    border: "0px solid #a1a1a1",
    background: "#fff",
    borderRadius: "3px",
    textAlign: "center",
  },

  cartBtn: {
    marginTop: "0.5rem",
    width: "100%",
    marginBottom: 0,
  },
}));
