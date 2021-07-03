import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import logoOrange from "../../assets/images/logo-orange.png";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

const ContactUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutUsContainer}>
      <div className={classes.logoContainer}>
        <img alt={"logo"} src={logoOrange} className={classes.logo} />
      </div>
      <Typography variant="h4" gutterBottom className={classes.aboutUsTitle}>
        Contact Us
        <div className={classes.stylizedUnderline}></div>
      </Typography>
      <div className={classes.aboutUsBody}>
        <div className={classes.aboutUsContent}>
          <div className={classes.contentBlock}>
            <RoomIcon className={classes.icons} />
            <Typography
              variant="body1"
              gutterBottom
              className={classes.content}
            >
              1ST FLOOR, SHANGRILA PLAZA, ROAD NO.2 , BANJARA HILLS, Hyderabad ,
              Telangana , 500034
            </Typography>
          </div>
          <div className={classes.contentBlock}>
            <PhoneIcon className={classes.icons} />
            <Typography
              variant="body1"
              gutterBottom
              className={classes.content}
            >
              +91 7406234567
            </Typography>
          </div>

          <div className={classes.contentBlock}>
            <MailIcon className={classes.icons} />
            <Typography
              variant="body1"
              gutterBottom
              className={classes.content}
            >
              info@mrmart.co.in
            </Typography>
          </div>
        </div>
        <iframe
          title="MR MART Address"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3806.709569764773!2d78.4202587!3d17.4257201!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb912d3ddc2769%3A0xf9ef63ef54724ffe!2sShangrila%20Plaza!5e0!3m2!1sen!2sin!4v1624696476092!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "start",
    },
  },
  aboutUsContent: {
    padding: "1rem 0",
    width: "50%",
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
  contentBlock: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
  icons: {
    background: theme.palette.primary.main,
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "2rem",
  },
}));
