import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import MyOrderItem from "./MyOrderItem";
import Typography from "@material-ui/core/Typography";
import noOrdersFound from "../../assets/images/nothing-found.png";

const MyOrdersPanel = ({ orders }) => {
  const classes = useStyles();

  return (
    <div className={classes.checkoutWrapper}>
      <Box className={classes.tabPanel}>
        {orders && orders.length > 0 ? (
          orders.map((order) => <MyOrderItem order={order} key={order.oid} />)
        ) : (
          <div className={classes.noOrdersFound}>
            <img
              alt={"No orders found"}
              src={noOrdersFound}
              className={classes.noOrdersFoundImage}
            />
            <Typography
              className={classes.noOrdersFoundText}
              gutterBottom
              variant="h6"
              component="h4"
            >
              No orders found
            </Typography>
          </div>
        )}
      </Box>
    </div>
  );
};
export default MyOrdersPanel;

const useStyles = makeStyles((theme) => ({
  checkoutWrapper: {},
  tabPanel: {},
  loadingIndicator: {
    padding: "1rem",
  },
  noOrdersFound: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  noOrdersFoundImage: {
    height: "30vh",
  },
  noOrdersFoundText: {
    paddingTop: "1rem",
  },
}));
