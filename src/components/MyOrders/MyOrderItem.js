import React, { useState } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MyOrderProduct from "./MyOrderProduct";
import fetchOrderItems from "../OrderPlaced/fetchOrderItems";
import { formatPrice } from "../../helpers/Constants";

const MyOrderItem = ({ order }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [showOrderItems, setShowOrderItems] = useState(false);
  const [loadingOrderItems, setLoadingOrderItems] = useState(false);

  function getDate() {
    let date = order?.created_On?.split(" ")[0]?.split("-") ?? "-";
    return `${date[2]}/${date[1]}/${date[0]}`;
  }

  async function getOrderItems(orderId) {
    setLoadingOrderItems(true);
    const orderItems = await fetchOrderItems(orderId);
    if (orderItems) {
      setProducts(orderItems.data);
      // order = { ...order, orderItems: orderItems.data };
    } else {
      setProducts(null);
    }
    setLoadingOrderItems(false);
  }

  function handleShowOrderItems(orderId) {
    getOrderItems(orderId);
    setShowOrderItems(true);
  }

  return (
    <>
      <ListItem className={classes.myOrder}>
        <Box
          className={clsx(classes.orderDetailsGroup, {
            [classes.activeOrderBg]:
              order.status === "Awaiting Payment" ||
              order.status === "Pending Confirmation" ||
              order.status === "Order Accepted" ||
              order.status === "accepted Order" ||
              order.status === "Order Processing",
            [classes.deliveredOrderBg]: order.status === "Delivered",
            [classes.cancelledOrderBg]: order.status === "Order Declined",
            [classes.removeRoudedCorners]: showOrderItems,
          })}
        >
          <Box className={classes.contentGroup}>
            <Typography
              variant="body2"
              component="h1"
              className={clsx(classes.orderSubTitles)}
            >
              Order ID
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.orderValues}
            >
              {order.oid}
            </Typography>
          </Box>
          <Hidden smDown>
            <Box className={classes.contentGroup}>
              <Typography
                variant="body2"
                component="h1"
                className={classes.orderSubTitles}
              >
                Placed On
              </Typography>
              <Typography
                variant="body1"
                component="h2"
                className={classes.orderValues}
              >
                {order && getDate()}
              </Typography>
            </Box>
          </Hidden>

          <Box className={classes.contentGroup}>
            <Typography
              variant="body1"
              component="h1"
              className={classes.orderSubTitles}
            >
              Total
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className={classes.orderValues}
            >
              {formatPrice.format(order.amount)}
            </Typography>
          </Box>
          <Box className={classes.contentGroupLast}>
            <Typography
              variant="caption"
              component="h6"
              className={clsx(classes.statusBox, {
                [classes.activeOrderLabel]:
                  order.status === "Awaiting Payment" ||
                  order.status === "Pending Confirmation" ||
                  order.status === "Order Accepted" ||
                  order.status === "accepted Order" ||
                  order.status === "Order Processing",
                [classes.deliveredOrderLabel]: order.status === "Delivered",
                [classes.cancelledOrderLabel]:
                  order.status === "Order Declined",
              })}
            >
              {order.status}
            </Typography>
            {showOrderItems ? (
              <Typography variant="body1" component="h4">
                {order.payment_type}
              </Typography>
            ) : (
              <Button
                color="secondary"
                className={classes.viewBtn}
                onClick={() => handleShowOrderItems(order.oid)}
              >
                View <KeyboardArrowDownIcon />
              </Button>
            )}
          </Box>
        </Box>
        <Divider />
        {showOrderItems && (
          <Box className={classes.orderItemsContainer}>
            {loadingOrderItems ? (
              <CircularProgress
                size={"small"}
                className={classes.loadingIndicator}
              />
            ) : (
              <>
                <div className={classes.orderAddressGroup}>
                  <div className={classes.deliveryDetails}>
                    {products ? (
                      <>
                        <Typography
                          variant="body1"
                          component="h4"
                          className={classes.orderSubTitles}
                        >
                          Delivery location: &nbsp;
                        </Typography>
                        <Typography variant="body1" component="h4">
                          {`${order.location}, ${order.city}, ${order.pincode}`}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body1" component="h4">
                        Sorry, No details found
                      </Typography>
                    )}
                  </div>
                  <IconButton
                    aria-label="close"
                    className={classes.closeBtn}
                    onClick={() => setShowOrderItems(false)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
                {products &&
                  products.map((product, index) => {
                    return (
                      <MyOrderProduct
                        key={product.pid}
                        setShowOrderItems={setShowOrderItems}
                        product={product}
                        islast={index === products.length - 1}
                      />
                    );
                  })}
              </>
            )}
          </Box>
        )}
      </ListItem>
    </>
  );
};

export default MyOrderItem;

const useStyles = makeStyles((theme) => ({
  myOrder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: "0.5rem",
    padding: 0,
    marginBottom: "1rem",
    height: "100%",
    width: "90%",
    backgroundColor: "#fcfcfc",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  },

  orderDetailsGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
    paddingLeft: "1rem",
    borderRadius: "0.5rem",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  removeRoudedCorners: {
    borderRadius: "0.5rem 0.5rem 0 0",
    padding: "0.5rem 0",
    paddingLeft: "1rem",
  },
  orderSubTitles: {
    color: "#595959",
  },
  orderValues: {
    fontWeight: "600",
    fontSize: "1.2rem",
    color: "#333",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  statusBox: {
    padding: "0.2rem 1rem",
    borderRadius: "5px 0 0px 5px",
    fontFamily: "Zen Dots, cursive",
    color: "#fafafa",
    [theme.breakpoints.down("xs")]: {
      padding: "0.2rem 0.2rem",
      fontSize: "0.6rem",
    },
  },
  activeOrderBg: {
    backgroundColor: "#FFE082",
  },
  activeOrderLabel: {
    backgroundColor: "#FFCA28",
  },
  deliveredOrderBg: {
    backgroundColor: "#80CBC4",
  },
  deliveredOrderLabel: {
    backgroundColor: "#26A69A",
  },
  cancelledOrderBg: {
    backgroundColor: "#ef9a9a",
  },
  cancelledOrderLabel: {
    backgroundColor: "#ef5350",
  },
  contentGroupLast: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  viewBtn: {
    width: "70%",
    alignSelf: "center",
  },
  orderItemsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  loadingIndicator: {
    padding: "1rem",
    alignSelf: "center",
  },
  orderAddressGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    borderBottom: "0.06rem solid #59595945",
  },
  deliveryDetails: {
    display: "flex",
  },
  closeBtn: {
    color: "#D81B60",
  },
}));
