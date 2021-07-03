import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import fetchCartItems from "../CartScreen/fetchCartItems";
import addToCart from "../ProductCard/addToCart";
import {
  mediaUrl,
  formatPrice,
  calculateDiscountedPrice,
} from "../../helpers/Constants";
import { useCart, useCartUpdate } from "../../contexts/CartContext";
import { usePincodes } from "../../contexts/PincodesContext";
import discountImage from "../../assets/images/discount.png";

const ProductDetails = ({
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
    let mounted = true;

    if (mounted && cart) {
      checkIfItemIsInCart();
    }

    function checkIfItemIsInCart() {
      cart &&
        cart.map((item) => {
          if (item.pid === product.pid) {
            setIsInCart(true);
            return null;
          }
          setIsInCart(false);
          return null;
        });
    }

    return function cleanup() {
      mounted = false;
    };
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
    <Container className={classes.BoxWrapper}>
      <Box className={classes.BoxLeft}>
        <Container className={classes.imageContainer}>
          <img
            alt={product.name}
            src={mediaUrl + product.image}
            className={classes.productImage}
          />
        </Container>
      </Box>
      <Box className={classes.BoxRight}>
        <Typography variant="h4" component="h1" className={classes.productName}>
          {product.name}
        </Typography>
        <Box component="span" className={classes.productText}>
          <Typography variant="body1" className={classes.productSubTitles}>
            Price
          </Typography>
          <div className={classes.priceBlock}>
            <Typography
              gutterBottom
              variant="h4"
              component="h4"
              className={classes.discountPrice}
            >
              {formatPrice.format(
                calculateDiscountedPrice(product.price, product.discount)
              )}
            </Typography>

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
            <Typography
              variant="h6"
              component="span"
              className={classes.actualPrice}
            >
              {product.discount > 0 && formatPrice.format(product.price)}
            </Typography>
          </div>
        </Box>
        <div className={classes.qtyBlock}>
          <IconButton
            color="secondary"
            className={classes.removeBtn}
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
            className={classes.addBtn}
            disabled={isInCart || !user || !pincodes?.userPincode}
            aria-label="add quatity"
            onClick={() => updateQuantity("plus")}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Box className={classes.subFlex}>
          <Tooltip
            title={
              !user
                ? "Sign in to add to cart"
                : !pincodes?.userPincode
                ? "Please, update pincode to add item to cart"
                : isInCart
                ? "Item already in cart"
                : ""
            }
            placement="bottom"
          >
            <span>
              <Button
                size="large"
                variant="contained"
                color="primary"
                disabled={
                  isInCart ||
                  product.instock < 1 ||
                  !user ||
                  !pincodes?.userPincode
                }
                onClick={addItem}
              >
                <ShoppingBasketIcon style={{ marginRight: "0.7rem" }} /> Add to
                Cart
              </Button>
            </span>
          </Tooltip>
        </Box>
        <Typography className={classes.productSubTitles} variant="body1">
          Description
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          className={classes.productDescription}
        >
          {product.description}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetails;

const useStyles = makeStyles((theme) => ({
  BoxWrapper: {
    paddingTop: "14vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "18vh",
    },
  },

  BoxLeft: {
    width: "50%",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignSelf: "center",
    },
  },
  imageContainer: {
    width: "95%",
  },
  productImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignSelf: "flex-start",
    },
  },
  BoxRight: {
    padding: "1rem 2rem",
    paddingBottom: "2rem",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      alignSelf: "center",
    },
  },
  productName: {
    marginBottom: "1rem",
    textTransform: "capitalize",
    color: "#292929",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  priceBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: 0,
    marginBottom: "1rem",
    cursor: "default",
  },
  discountPrice: {
    margin: 0,
  },
  actualPrice: {
    color: "#696969",
    alignSelf: "center",
    textDecoration: "line-through",
  },
  discountBlock: {
    position: "relative",
    margin: "0 1rem 1rem 0.5rem",
  },
  discountImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "2.4rem",
    height: "2.4rem",
  },
  discountValue: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: "600",
  },
  qtyBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
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
  productSubTitles: {
    color: "#797979",
    fontWeight: "bold",
  },
  productDescription: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  subFlex: {
    marginTop: "1rem",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
    minWidth: "240px",
  },

  outOfStock: {
    color: "#d50000",
  },
}));
