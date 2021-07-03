import React, { useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import fetchCartItems from "./fetchCartItems";
import updateCartItems from "./updateCartItems";
import DeleteCartItemDialog from "./DeleteCartItemDialog";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  mediaUrl,
  formatPrice,
  calculateDiscountedPrice,
} from "../../helpers/Constants";
import { useCartUpdate } from "../../contexts/CartContext";
import { usePincodes } from "../../contexts/PincodesContext";

const CartItem = ({
  item,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const pincodes = usePincodes();
  const updateCart = useCartUpdate();
  const [quantity, setQuantity] = useState(item.items);
  const [dialogOpen, setDialogOpen] = useState(false);

  function updateSnackBar(status, message, severity) {
    updateSnackbarStatus(false);
    setTimeout(() => updateSnackbarStatus(status), 0);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  async function updateOnlineCart(type) {
    if (type === "add") {
      if (quantity === item.instock) {
        updateSnackBar(true, "Maximum quantity reached", "error");
        return;
      }
      setQuantity(+quantity + 1);
    } else if (type === "remove") {
      if (quantity === 1) {
        updateSnackBar(true, "Minimum quantity is 1", "info");
        return;
      }
      setQuantity(+quantity - 1);
    }
    const response = await updateCartItems(
      type === "add" ? +quantity + 1 : +quantity - 1,
      item.cart_id
    );
    if (response.status) {
      const data = await fetchCartItems(item.uid);
      updateCart(data);
      updateSnackBar(true, "Quantity updated successfully.", "success");
      return;
    }
    updateSnackBar(true, response.message, "error");
  }

  return (
    <>
      <ListItem className={classes.cartItem}>
        <Link
          to={{
            pathname: `/prod-details/${item.pid}`,
            state: { product: item },
          }}
          className={classes.linkReset}
        >
          <img
            alt={item.name}
            src={mediaUrl + item.image}
            className={classes.productImage}
          />
        </Link>
        <Box className={classes.productDetailsGroup}>
          <Link
            to={{
              pathname: `/prod-details/${item.pid}`,
              state: { product: item },
            }}
            className={classes.linkReset}
          >
            <Hidden smDown>
              <Typography
                variant="h6"
                component="div"
                className={classes.productTitle}
              >
                {item.name}
              </Typography>
            </Hidden>
            <Hidden mdUp>
              <Typography
                variant="h6"
                component="div"
                className={classes.productTitle}
              >
                {`${item.name.slice(0, 14)}...`}
              </Typography>
            </Hidden>
          </Link>
          <div className={classes.priceContainer}>
            <Typography
              variant="h6"
              component="div"
              className={classes.productDiscountedPrice}
            >
              {formatPrice.format(
                calculateDiscountedPrice(item.price, item.discount)
              )}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              className={classes.productActualPrice}
            >
              {formatPrice.format(item.price)}
            </Typography>
          </div>
          <div className={classes.qtyBlock}>
            <IconButton
              size="small"
              color="secondary"
              disabled={!pincodes?.userPincode}
              aria-label="remove quantity"
              onClick={() => updateOnlineCart("remove")}
            >
              <RemoveIcon />
            </IconButton>
            <input
              className={classes.qtyInput}
              disabled={true}
              value={quantity}
            />
            <IconButton
              size="small"
              color="primary"
              disabled={!pincodes?.userPincode}
              aria-label="add quatity"
              onClick={() => updateOnlineCart("add")}
            >
              <AddIcon />
            </IconButton>
          </div>

          <div>
            <Button
              className={classes.removeLink}
              onClick={() => setDialogOpen(true)}
            >
              Remove
            </Button>
            <DeleteCartItemDialog
              item={item}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              updateSnackBar={updateSnackBar}
            />
          </div>
        </Box>
        <Box className={classes.productPriceGroup}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.productSubTitles}
          >
            Item Total
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            className={classes.productDiscountedTotal}
          >
            {formatPrice.format(
              calculateDiscountedPrice(item.price, item.discount) * quantity
            )}
          </Typography>
          <Typography
            variant="subtitle2"
            component="h2"
            className={classes.productCalculatedPrice}
          >
            {formatPrice.format(item.price * quantity)}
          </Typography>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartItem;

const useStyles = makeStyles((theme) => ({
  cartItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1rem",
    margin: "1rem 0",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 0.2rem",
    },
  },
  productImage: {
    width: "176px",
    height: "176px",
    objectFit: "contain",
    paddingTop: "none",
    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },
  },

  productDetailsGroup: {
    flexGrow: 1,
    paddingLeft: "2rem",
    height: "176px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "120px",
    },
  },
  linkReset: {
    textDecorationLine: "none",
  },
  productTitle: {
    textTransform: "capitalize",
    fontweight: "bold",
    fontSize: "1.4rem",
    color: "#292929",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  productDiscountedPrice: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  productActualPrice: {
    textDecoration: "line-through",
    color: "#454545cc",
    textAlign: "right",
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },

  qtyBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "140px",
    gap: "0.5rem",
    marginTop: "0.2rem",
    padding: "0.1rem 0.25rem",
    background: "#eaeaea",
    borderRadius: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "130px",
    },
  },
  qtyInput: {
    width: "2.2rem",
    height: "2rem",
    border: "0px solid #a1a1a1",
    background: "#fff",
    borderRadius: "3px",
    textAlign: "center",
  },
  removeLink: {
    marginTop: "0.5rem",
    color: "#D81B60",
  },
  productPriceGroup: {
    margin: "0 1rem",
  },
  productSubTitles: {
    color: "#777",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  productDiscountedTotal: {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  productCalculatedPrice: {
    textAlign: "right",
    textDecoration: "line-through",
    color: "#777",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));
