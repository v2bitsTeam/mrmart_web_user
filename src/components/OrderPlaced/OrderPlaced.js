import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import fetchOrderItems from "./fetchOrderItems";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MyOrderProduct from "../MyOrders/MyOrderProduct";
import {
  useOrderDetails,
  useOrderDetailsUpdate,
} from "../../contexts/OrderDetailsContext";
import { formatPrice } from "../../helpers/Constants";

const OrderPlaced = () => {
  const classes = useStyles();
  const orderDetails = useOrderDetails();
  const updateOrderDetails = useOrderDetailsUpdate();
  const orderId = localStorage.getItem("orderId");

  useEffect(() => {
    let mounted = true;

    async function getOrderItems() {
      console.log(orderId);
      const orderData = await fetchOrderItems(orderId);
      console.log(orderData);
      if (mounted) {
        updateOrderDetails(orderData);
      }
    }
    getOrderItems();

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className={classes.orderPlacedWrapper}>
      <Card className={classes.orderPlacedContainer}>
        <Typography
          className={classes.viewOrderTitle}
          variant="h5"
          component="h1"
        >
          Thank you for placing an order with us. We are happy to have you as
          our customer.
        </Typography>
        <Typography
          className={classes.viewOrderSubTitle}
          variant="h6"
          component="h4"
        >
          Our team will get this assigned and delivered at the earliest.
        </Typography>

        <Card>
          <Box className={classes.orderDetailsGroup}>
            <Box className={classes.metricGroup}>
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
                {orderId}
              </Typography>
            </Box>

            <Box className={classes.metricGroup}>
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
                {formatPrice.format(orderDetails?.order[0].amount ?? "0")}
              </Typography>
            </Box>
            <Box className={classes.lastBlock}>
              <Typography
                variant="caption"
                component="h6"
                className={classes.statusBox}
              >
                {orderDetails?.order[0].status}
              </Typography>
              <Typography
                variant="body1"
                component="h4"
                className={classes.paymentType}
              >
                {orderDetails?.order[0].payment_type ?? ""}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className={classes.address}>
            <Typography
              variant="body1"
              component="h4"
              className={classes.orderSubTitles}
            >
              Delivery To:
            </Typography>
            <Typography
              variant="body1"
              component="h4"
              className={classes.deliveryDetails}
            >
              {orderDetails?.order[0].city
                ? orderDetails.order[0].location +
                  ", " +
                  orderDetails.order[0].city +
                  ", " +
                  orderDetails.order[0].state +
                  ", " +
                  orderDetails.order[0].pincode
                : ""}
            </Typography>
          </Box>
          <Divider />
          <Box className={classes.products}>
            {orderDetails &&
              orderDetails?.data.map((product, index) => (
                <MyOrderProduct
                  key={product.pid}
                  product={product}
                  islast={index === orderDetails.data.length - 1}
                />
              ))}
          </Box>
        </Card>
        <div className={classes.buttonsGroup}>
          <Button
            className={classes.cartBtn}
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            Back to Home
          </Button>
          <Button
            className={classes.cartBtn}
            variant="contained"
            color="secondary"
            component={Link}
            to="/my-orders"
          >
            Go to My Orders
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderPlaced;

const useStyles = makeStyles((theme) => ({
  orderPlacedWrapper: {
    paddingTop: "18vh",
  },
  orderPlacedContainer: {
    width: "90%",
    margin: "0 auto",
    padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "8vh",
    },
  },
  viewOrderTitle: {
    padding: "1rem 0 0.5rem",
    fontSize: "1.2rem",
    fontWeight: "500",
  },
  viewOrderSubTitle: {
    padding: "0.8rem 0",
    fontSize: "1rem",
    fontWeight: "400",
  },
  orderDetailsGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0",
    backgroundColor: "#FFE082",
    paddingLeft: "1rem",
    borderRadius: "0.5rem 0.5rem 0 0",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  orderSubTitles: {
    color: "#595959",
  },
  orderValues: {
    fontWeight: "600",
    fontSize: "1.2rem",
    color: "#333",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  lastBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBox: {
    padding: "0.2rem 1rem",
    backgroundColor: "#FFCA28",
    borderRadius: "5px 0 0px 5px",
    fontFamily: "Zen Dots, cursive",
    color: "#fafafa",
    [theme.breakpoints.down("xs")]: {
      padding: "0.2rem 0.2rem",
      fontSize: "0.6rem",
    },
  },
  deliveryDetails: {
    fontWeight: "600",
  },
  paymentType: {
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  address: {
    padding: "0.5rem 1rem",
  },
  products: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  buttonsGroup: {
    width: "100%",
    padding: "1rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
}));
