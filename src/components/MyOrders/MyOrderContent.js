import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MyOrdersPanel from "./MyOrdersPanel";
import CircularProgress from "@material-ui/core/CircularProgress";

const MyOrderContent = ({ myOrders }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const handleChange = (event) => {
    setLoading(true);
    setSelectedTab(event.target.value);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) filterOrderTypes();

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myOrders]);

  function filterOrderTypes() {
    setActiveOrders([]);
    setDeliveredOrders([]);
    setCancelledOrders([]);
    myOrders &&
      myOrders.forEach((order) => {
        if (
          order.status === "Awaiting Payment" ||
          order.status === "Pending Confirmation" ||
          order.status === "Order Accepted" ||
          order.status === "accepted Order" ||
          order.status === "Order Processing"
        ) {
          setActiveOrders((current) => [...current, order]);
        } else if (order.status === "Delivered") {
          setDeliveredOrders((current) => [...current, order]);
        } else if (order.status === "Order Declined") {
          setCancelledOrders((current) => [...current, order]);
        }
      });
  }

  function evaluateCurrentOrders() {
    if (selectedTab === "Active") return activeOrders;
    else if (selectedTab === "Delivered") return deliveredOrders;
    else if (selectedTab === "Cancelled") return cancelledOrders;
    else return myOrders;
  }

  return (
    <div className={classes.myOrdersContent}>
      <div className={classes.myOrdersContentTopBar}>
        <Typography variant="h5" gutterBottom className={classes.myOrdersTitle}>
          {selectedTab} Orders
        </Typography>
        <FormControl
          color="secondary"
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel id="select-filled-label">Orders</InputLabel>
          <Select
            labelId="select-filled-label"
            id="demo-simple-select-filled"
            value={selectedTab}
            onChange={handleChange}
            className={classes.dropDown}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem
              value="Active"
              style={{
                backgroundColor: "#FFE082",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Active
            </MenuItem>
            <MenuItem
              value="Delivered"
              style={{
                backgroundColor: "#80CBC4",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Delivered
            </MenuItem>
            <MenuItem
              value="Cancelled"
              style={{
                backgroundColor: "#ef9a9a",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Cancelled
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.myOrdersContentBody}>
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <MyOrdersPanel orders={evaluateCurrentOrders()} />
        )}
      </div>
    </div>
  );
};

export default MyOrderContent;

const useStyles = makeStyles((theme) => ({
  myOrdersContentTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "0.5rem",
    borderBottom: "0.1rem solid #45454577",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0.5rem",
      padding: "0 0.5rem",
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  dropDown: {
    width: "150px",
  },
  myOrdersContentBody: {
    padding: "1rem 0",
  },
  loadingContainer: {
    height: "50vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
