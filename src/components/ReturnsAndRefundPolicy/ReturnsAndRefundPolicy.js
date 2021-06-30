import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import logoOrange from "../../assets/images/logo-orange.png";

const ReturnsAndRefundPolicy = () => {
  const classes = useStyles();

  return (
    <div className={classes.refundsContainer}>
      <div className={classes.logoContainer}>
        <img alt={"logo"} src={logoOrange} className={classes.logo} />
      </div>
      <Typography variant="h4" gutterBottom className={classes.refundsTitle}>
        Returns & Refund Policy
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <div className={classes.refundsBody}>
        <Typography variant="body1" gutterBottom className={classes.content}>
          All items are 100 % non-weak and sway safe .
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Still on the off chance that you didn't care for the item , we are
          available to supplant/Refund in the event that you transport us back .
          Return Logistics will be borne by client if the item isn't imperfect
          or harmed.
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom className={classes.content}>
          This thing is qualified with the expectation of complimentary
          substitution, inside 10 days of conveyance, in a far-fetched occasion
          of harmed, deficient or unique/wrong thing conveyed to you.
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom className={classes.content}>
          If you don't mind keep the thing in its unique condition, unique
          bundling, with client manual, guarantee cards, and unique
          embellishments in maker bundling for a fruitful return.
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom className={classes.content}>
          In the event that you report an issue with your Furniture or Planter
          ,we may plan a professional visit to your area. Based on the expert's
          assessment report, we will give goal.
        </Typography>
      </div>
    </div>
  );
};

export default ReturnsAndRefundPolicy;

const useStyles = makeStyles((theme) => ({
  refundsContainer: {
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
  refundsTitle: {
    fontFamily: "Zen Dots, cursive",
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
  refundsBody: {
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
}));
