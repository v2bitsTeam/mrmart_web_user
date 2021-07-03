import React from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import logoWhite from "../../assets/images/logo-white.png";
import playStoreIcon from "../../assets/images/playstore.png";
import appStoreIcon from "../../assets/images/app-store.png";
import footerImage from "../../assets/images/footer-image.png";

const Footer = () => {
  const classes = useStyles();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function openLink(appName) {
    if (appName === "appStore") {
      window.open("https://www.apple.com/in/app-store/", "_blank");
    } else {
      window.open(
        "https://play.google.com/store/apps/details?id=com.mrmart.MrMart",
        "_blank"
      );
    }
  }

  return (
    <div className={classes.footer}>
      <div className={classes.banner}>
        <img alt={"banner"} src={footerImage} className={classes.bannerImage} />
      </div>
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
          <div className={classes.topSectionContactUsContainer}>
            <Typography
              className={classes.topSectionContactUsTitle}
              gutterBottom
              variant="h6"
              component="h4"
            >
              Contact Us
            </Typography>
            <Hidden smDown>
              <Divider />
            </Hidden>
            <br />
            <div className={classes.topSectionContactUsBody}>
              <Typography gutterBottom variant="body1">
                WhatsApp us: 7406234567
              </Typography>
              <Typography gutterBottom variant="body1">
                Call us: +91 9666015382
              </Typography>
              <Typography gutterBottom variant="body1">
                6:00 AM to 8:00 PM, 365 days.
              </Typography>
              <br />
              <Typography gutterBottom variant="body2">
                Please, note that you are accessing the BETA version of
                www.mrmart.co
              </Typography>
              <Typography gutterBottom variant="body2">
                Should you encounter any bugs, glitches, lack of functionality,
                delayed deliveries, billing errors or other problems on the BETA
                version of the website, please email us on info@mrmart.co.in
              </Typography>
            </div>
          </div>
          <div className={classes.topSectionAppLinks}>
            <Typography
              gutterBottom
              variant="h6"
              className={classes.topSectionAppTitle}
            >
              For Mobile Apps
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className={classes.topSectionAppSubTitle}
            >
              Download Now
            </Typography>
            <br />
            <div className={classes.storeButtons}>
              <IconButton
                onClick={() => openLink("playStore")}
                aria-label="play-store"
                className={classes.playStoreIconButton}
              >
                <img
                  alt={"play-store"}
                  src={playStoreIcon}
                  className={classes.storeIcons}
                />
              </IconButton>
              <IconButton
                onClick={() => openLink("appStore")}
                aria-label="app-store"
                className={classes.appStoreIconButton}
              >
                <img
                  alt={"app-store"}
                  src={appStoreIcon}
                  className={classes.storeIcons}
                />
              </IconButton>
            </div>
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
  banner: {
    padding: "1rem",
    background: "#424242",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: "80vw",
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
  logoContainer: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topSectionLinksContainer: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  topSectionLinks: {
    color: "#efefef",
    textDecoration: "none",
  },

  logo: {
    height: "12vh",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
    },
  },
  topSectionContactUsContainer: {
    width: "40%",
    margin: "0 1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0.5rem",
    },
  },
  topSectionContactUsTitle: {
    paddingBottom: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
      textDecoration: "underline",
    },
  },
  topSectionContactUsBody: {
    padding: "0 1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0.5rem",
    },
  },
  topSectionAppLinks: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "1rem 0",
    },
  },
  topSectionAppTitle: {
    [theme.breakpoints.down("sm")]: {
      alignSelf: "flex-start",
      padding: "0 1rem",
      textDecoration: "underline",
    },
  },
  topSectionAppSubTitle: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  storeButtons: {
    display: "flex",
    gap: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.4rem",
      width: "100%",
      justifyContent: "space-evenly",
    },
  },
  playStoreIconButton: {
    "&:hover": {
      background: "#FB8C0033",
    },
  },
  storeIcons: {
    width: "2rem",
    height: "2rem",
  },
  appStoreIconButton: {
    "&:hover": {
      background: "#0288D133",
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
