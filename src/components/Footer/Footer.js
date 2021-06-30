import React from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import logoWhite from "../../assets/images/logo-white.png";
import { Hidden } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={classes.footer}>
      <div className={classes.topSection}>
        <Hidden smDown>
          <Typography
            className={classes.topSectionTitle}
            gutterBottom
            variant="h6"
            component="h4"
          >
            MR MART
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.mobileLogoContainer}>
            <img alt={"logo"} src={logoWhite} className={classes.mobileLogo} />
          </div>
        </Hidden>
        <Container className={classes.topSectionBody}>
          <div className={classes.logoContainer}>
            <Hidden smDown>
              <img alt={"logo"} src={logoWhite} className={classes.logo} />
            </Hidden>
          </div>
          <div className={classes.topSectionLinksContainer}>
            <Link
              to="/about"
              className={classes.topSectionLinks}
              onClick={scrollToTop}
            >
              <ListItem button divider>
                <ListItemText primary="About Us" />
              </ListItem>
            </Link>
            <Link
              to="/contact"
              className={classes.topSectionLinks}
              onClick={scrollToTop}
            >
              <ListItem button divider>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </Link>
            <Link
              to="/privacy-policy"
              className={classes.topSectionLinks}
              onClick={scrollToTop}
            >
              <ListItem button divider>
                <ListItemText primary="Privacy Policy" />
              </ListItem>
            </Link>
            <Link
              to="/shipping-policy"
              className={classes.topSectionLinks}
              onClick={scrollToTop}
            >
              <ListItem button divider>
                <ListItemText primary="Shipping Policy" />
              </ListItem>
            </Link>
            <Link
              to="/returns-and-refunds"
              className={classes.topSectionLinks}
              onClick={scrollToTop}
            >
              <ListItem button divider>
                <ListItemText primary="Returns & Refunds" />
              </ListItem>
            </Link>
            <Link
              to="/terms-and-conditions"
              className={classes.topSectionLinks}
              onClick={scrollToTop}
            >
              <ListItem button divider>
                <ListItemText primary="Terms & Conditions" />
              </ListItem>
            </Link>
          </div>
        </Container>
      </div>
      <div className={classes.bottomSection}>
        <Typography
          className={classes.bottomSectionContent}
          gutterBottom
          variant="subtitle1"
          component="div"
        >
          &copy; Copyright 2021, MR MART
        </Typography>
      </div>
    </div>
  );
};

export default Footer;

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-betweem",
    justifyContent: "center",
    color: "#efefef",
  },
  topSection: {
    padding: "0 7.5%",
    background: "#424242",
    [theme.breakpoints.down("sm")]: {
      padding: "0 5%",
    },
  },
  topSectionTitle: {
    padding: "0.5rem",
    color: "#fff",

    fontFamily: "Zen Dots, cursive",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  mobileLogoContainer: {
    margin: "1rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileLogo: {
    height: "10vh",
    objectFit: "contain",
  },
  topSectionBody: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  topSectionLinksContainer: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  topSectionLinks: {
    color: "#efefef",
    textDecoration: "none",
  },
  logoContainer: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  socialsContainer: {
    flexDirection: "column",
    gap: "3rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      justifyContent: "space-around",
    },
  },
  logo: {
    height: "12vh",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
    },
  },

  bottomSection: {
    background: "#212121",
    color: "#fafafa",
    padding: "0.8rem 7.5%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  bottomSectionContent: {},
}));
