import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import logoOrange from "../../assets/images/logo-orange.png";

const ShippingPolicy = () => {
  const classes = useStyles();

  return (
    <div className={classes.privacyPolicyContainer}>
      <div className={classes.logoContainer}>
        <img alt={"logo"} src={logoOrange} className={classes.logo} />
      </div>
      <Typography
        variant="h4"
        gutterBottom
        className={classes.privacyPolicyTitle}
      >
        Shipping Policy
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <div className={classes.privacyPolicyBody}>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Assessed conveyance time relies upon the accompanying components:
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          The Seller offering the item
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Item's accessibility with the Seller
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          The objective to which you need the request delivered to and area of
          the Seller.
        </Typography>
      </div>
    </div>
  );
};

export default ShippingPolicy;

const useStyles = makeStyles((theme) => ({
  privacyPolicyContainer: {
    width: "85%",
    maxWidth: "1635px",
    margin: "1rem auto",
    paddingTop: "10vh",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "18vh",
    },
  },
  logoContainer: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: "2vh",
  },
  logo: {
    height: "10vh",
    objectFit: "contain",
  },
  privacyPolicyTitle: {
    fontFamily: "Zen Dots, cursive",
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
  privacyPolicyBody: {
    padding: "1rem 0",
  },
  space: {
    display: "block",
    height: "0.6rem",
  },
  subTitles: {
    letterSpacing: "0.1rem",
  },
  underline: {
    textDecoration: "underline",
    paddingRight: "0.2rem",
  },
  content: {
    color: "#292929",
    padding: "0 1rem ",
    fontSize: "1.1rem",
  },
  email: {
    textDecoration: "underline",
    color: "#2196F3",
  },
}));
