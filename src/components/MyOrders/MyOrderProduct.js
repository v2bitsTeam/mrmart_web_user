import React from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { formatPrice, mediaUrl } from "../../helpers/Constants";

const MyOrderProduct = ({ product, islast }) => {
  const classes = useStyles();

  return (
    <div className={classes.productDetailsContainer}>
      <div className={classes.productDetailsGroup}>
        <Link
          to={{
            pathname: `/prod-details/${product.pid}`,
            state: { product },
          }}
          className={classes.productNameLink}
        >
          <img
            alt={product.name}
            src={product.image ? mediaUrl + product.image : ""}
            className={classes.itemImage}
          />
        </Link>
        <div className={classes.verticalDivider}></div>
        <Box className={classes.productPriceGroup}>
          <Link
            to={{
              pathname: `/prod-details/${product.pid}`,
              state: { product },
            }}
            className={classes.productNameLink}
          >
            <Hidden smDown>
              <Typography
                variant="body1"
                component="h2"
                className={classes.productTitle}
              >
                {product.name}
              </Typography>
            </Hidden>
            <Hidden mdUp>
              <Typography
                variant="body1"
                component="h2"
                className={classes.productTitle}
              >
                {`${product.name.slice(0, 20)}...`}
              </Typography>
            </Hidden>
          </Link>
          <div className={classes.productDetailsBlock}>
            <Typography
              variant="body1"
              component="h1"
              className={classes.productSubTitles}
            >
              Qty:
            </Typography>
            <Typography
              variant="body1"
              component="h1"
              className={classes.productValues}
            >
              {product.items}
            </Typography>
          </div>
          <div className={classes.productDetailsBlock}>
            <Typography
              variant="body1"
              component="h1"
              className={classes.productSubTitles}
            >
              Price:
            </Typography>
            <Typography
              variant="body1"
              component="h1"
              className={classes.productValues}
            >
              {formatPrice.format(product.price)}
            </Typography>
          </div>
        </Box>
      </div>
      {!islast && <div className={classes.border}></div>}
    </div>
  );
};

export default MyOrderProduct;

const useStyles = makeStyles((theme) => ({
  productDetailsGroup: {
    marginLeft: "2rem",
    display: "flex",
    justifyContent: "flex-start",
    padding: "0.8rem 0.4rem",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "1rem",
    },
  },
  itemImage: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
  },
  verticalDivider: {
    width: "0.1rem",
    margin: "0 1rem",
    background: "#5559",
  },
  productPriceGroup: {
    marginLeft: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1rem",
    },
  },
  productTitle: {
    textAlign: "left",
    fontWeight: "500",
  },
  productNameLink: {
    textDecorationLine: "none",
    color: "#292929",
  },

  productDetailsBlock: {
    display: "flex",
    alignItems: "center",
  },
  productSubTitles: {
    color: "#595959",
  },
  productValues: {
    paddingLeft: "0.5rem",
    color: "#292929",
    fontWeight: "500",
  },
  border: {
    width: "90%",
    height: "0.1rem",
    background: "linear-gradient(90deg, #9995, #999a, #9995)",
  },
}));
