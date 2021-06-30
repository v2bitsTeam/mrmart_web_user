import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import logoOrange from "../../assets/images/logo-orange.png";

const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <div className={classes.termsContainer}>
      <div className={classes.logoContainer}>
        <img alt={"logo"} src={logoOrange} className={classes.logo} />
      </div>
      <Typography variant="h4" gutterBottom className={classes.termsTitle}>
        Terms & Conditions
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <div className={classes.termsBody}>
        <Typography variant="body1" gutterBottom className={classes.content}>
          By visiting our site as well as buying something from us, you
          participate in our "Administration" and consent to be limited by the
          accompanying terms and conditions ("Terms of Service", "Terms"),
          including those extra terms and conditions and arrangements referred
          to in this or potentially accessible by hyperlink. These Terms of
          Service apply to all clients of the site, including without impediment
          clients who are programs, sellers, clients, traders, or potentially
          givers of substance.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.content}>
          Any new highlights or instruments which are added to the current store
          will likewise be dependent upon the Terms of Service. You can survey
          the most current adaptation of the Terms of Service whenever on this
          page. We claim all authority to refresh, change or supplant any piece
          of these Terms of Service by posting refreshes or potentially changes
          to our site. It is your obligation to check this page occasionally for
          changes. Your proceeded with utilization of or admittance to the site
          following the posting of any progressions establishes acknowledgment
          of those changes.
        </Typography>
      </div>
    </div>
  );
};

export default TermsAndConditions;

const useStyles = makeStyles((theme) => ({
  termsContainer: {
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
  termsTitle: {
    fontFamily: "Zen Dots, cursive",
  },
  stylizedUnderline: {
    width: "3rem",
    height: "0.5rem",
    borderRadius: "1rem",
    background: "#D81B60",
  },
  termsBody: {
    padding: "0.5rem 0",
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
    padding: "0.5rem 1rem ",
    fontSize: "1.1rem",
  },
  email: {
    textDecoration: "underline",
    color: "#2196F3",
  },
}));
