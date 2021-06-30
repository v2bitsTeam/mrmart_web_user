import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import fetchMyOrders from "./fetchMyOrders";
import { useMyOrders, useMyOrdersUpdate } from "../../contexts/MyOrdersContext";
import MyOrderContent from "./MyOrderContent";

const MyOrdersView = () => {
  const classes = useStyles();
  const myOrders = useMyOrders();
  const updateMyOrders = useMyOrdersUpdate();
  const user = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    let mounted = true;

    async function getOrders(userId) {
      const myOrders = await fetchMyOrders(userId);
      if (mounted) {
        updateMyOrders(myOrders);
      }
    }

    getOrders(user.uid);

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.myOrdersWrapper}>
      <div align="center" className={classes.myOrdersContainer}>
        <Typography variant="h4" gutterBottom className={classes.myOrdersTitle}>
          Your Orders
          <div className={classes.stylizedUnderline}></div>
        </Typography>

        <MyOrderContent myOrders={myOrders} />

        {/* <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          // textColor="primary"
          className={classes.tabs}
          variant="fullWidth"
        >
          <Tab
            label="All"
            className={clsx(classes.allOrdersTabHeader, {
              [classes.allOrdersTabHeaderActive]: selectedTab === 0,
            })}
          />
          <Tab
            label="Active"
            className={clsx(classes.activeOrdersTabHeader, {
              [classes.activeOrdersTabHeaderActive]: selectedTab === 1,
            })}
          />
          <Tab
            label="Delivered"
            className={clsx(classes.deliveredOrdersTabHeader, {
              [classes.deliveredOrdersTabHeaderActive]: selectedTab === 2,
            })}
          />
          <Tab
            label="Cancelled"
            className={clsx(classes.cancelledOrdersTabHeader, {
              [classes.cancelledOrdersTabHeaderActive]: selectedTab === 3,
            })}
          />
        </Tabs> */}
        {/* <div role="tabpanel" hidden={selectedTab !== 0}>
          <MyOrdersTabPanel orders={myOrders} />
        </div>
        <div role="tabpanel" hidden={selectedTab !== 1}>
          <MyOrdersTabPanel orders={activeOrders} />
        </div>
        <div role="tabpanel" hidden={selectedTab !== 2}>
          <MyOrdersTabPanel orders={deliveredOrders} />
        </div>
        <div role="tabpanel" hidden={selectedTab !== 3}>
          <MyOrdersTabPanel orders={cancelledOrders} />
        </div> */}
      </div>
    </Box>
  );
};

export default MyOrdersView;

const useStyles = makeStyles((theme) => ({
  myOrdersWrapper: {
    width: "100%",
    marginTop: "0vh",
    padding: "4vh 0",
    paddingTop: "14vh",
    background: "#f9f9f9",
    backgroundColor: "#fff",

    [theme.breakpoints.down("md")]: {
      marginTop: "0vh",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10vh",
    },
  },
  myOrdersContainer: {
    width: "70%",
    margin: "0 auto",

    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  myOrdersTitle: {
    padding: "1rem",
    fontFamily: "Zen Dots, cursive",
    textAlign: "left",
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },

  tabs: {
    marginBottom: "2vh",
    background: "#fff",
    borderBottom: "0.09rem solid #39393999",
    width: "100%",
    borderRadius: "0.4rem 0.4rem 0 0",
  },
  allOrdersTabHeader: {
    background: "#F9F9F9",
  },
  allOrdersTabHeaderActive: {
    background: "#F9F9F9ee",
    fontWeight: "600",
  },
  activeOrdersTabHeader: {
    background: "#FFE08255",
  },
  activeOrdersTabHeaderActive: {
    background: "#FFE082ee",
    color: "#fff",
    fontWeight: "600",
  },
  deliveredOrdersTabHeader: {
    background: "#80CBC455",
  },
  deliveredOrdersTabHeaderActive: {
    background: "#80CBC4ee",
    color: "#fff",
    fontWeight: "600",
  },
  cancelledOrdersTabHeader: {
    background: "#ef9a9a55",
  },
  cancelledOrdersTabHeaderActive: {
    background: "#ef9a9aee",
    color: "#fff",
    fontWeight: "600",
  },
}));
