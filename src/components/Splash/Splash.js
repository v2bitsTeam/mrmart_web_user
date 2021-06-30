import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import logo from "../../assets/images/logo.png";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";

const Splash = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <img alt={"logo"} src={logo} className={classes.logo} />
      </div>
      <div className={classes.titleContainer}>
        <Typography variant="h5" className={classes.title}>
          MR MART
        </Typography>
      </div>
      <br />
      <CircularProgress color="secondary" size={32} />
    </div>
  );
};

export default Splash;

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
  },
  titleContainer: {},
  title: {
    // fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
}));
