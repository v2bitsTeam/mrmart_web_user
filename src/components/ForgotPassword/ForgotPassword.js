import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { fonts } from "../../helpers/BaseStyles";

const ForgotPassword = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.heading}
            gutterBottom
            divider
          >
            Forgot your password?
          </Typography>
          <Divider />
          <br />
          <div className={classes.content}>
            <Typography variant="body1" color="textSecondary">
              Have you forgot your account password?
            </Typography>
            <Typography
              variant="body1"
              className={classes.content}
              color="textSecondary"
            >
              Don't worry, we are here to help.
            </Typography>
            <Typography className={classes.mainContent} color="textPrimary">
              Please, contact us at{" "}
              <span className={classes.mail}>info@mrmart.co.in</span> and we
              would help you out.
            </Typography>
            <Button
              component={Link}
              to="/ap/login"
              variant="contained"
              color="primary"
              className={classes.loginButton}
              size="large"
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f0f0",
  },
  card: {
    width: "50vw",
    minWidth: "400px",
    height: "300px",
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  mainContent: {
    marginTop: "1.4rem",
    marginBottom: "1.4rem",
  },
  mail: {
    fontWeight: fonts.bold,
  },
  loginButton: {
    width: "50%",
    margin: "auto",
  },
}));
