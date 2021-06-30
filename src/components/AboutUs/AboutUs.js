import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import logoOrange from "../../assets/images/logo-orange.png";

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutUsContainer}>
      <div className={classes.logoContainer}>
        <img alt={"logo"} src={logoOrange} className={classes.logo} />
      </div>
      <Typography variant="h4" gutterBottom className={classes.aboutUsTitle}>
        About Us
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <div className={classes.aboutUsBody}>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Visit our online supermarket store to buy grocery, daily needs,
          vegetables, fruits, cosmetics, toiletries, milk, housekeeping
          products, and much more ...
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          We deliver best products in a less time
        </Typography>

        <br />
        <Typography variant="h6" gutterBottom className={classes.subTitles}>
          <span className={classes.underline}>About the Company</span>:
        </Typography>

        <Typography variant="body1" gutterBottom className={classes.content}>
          MR MART, Registered in 2020 at Hyderabad in Telangana, is leading
          Distributor of in India. MR MART is one of Trade India's verified and
          trusted sellers of listed products. With their extensive experience of
          supplying and trading , MR MART has made a reputed name for themselves
          in the market with high quality etc. Focusing on a customer centric
          approach, MR MART has a pan-India presence and caters to a huge
          consumer base throughout the country. Buy in bulk from MR MART at
          Trade India quality-assured products.
        </Typography>
      </div>
    </div>
  );
};

export default AboutUs;

const useStyles = makeStyles((theme) => ({
  aboutUsContainer: {
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
  aboutUsTitle: {
    fontFamily: "Zen Dots, cursive",
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
  aboutUsBody: {
    padding: "1rem 0",
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
