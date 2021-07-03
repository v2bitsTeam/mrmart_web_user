import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import sendPasswordMail from "./sendPasswordMail";
import CircularProgress from "@material-ui/core/CircularProgress";

const ForgotPassword = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateSnackbar(message, severity) {
    updateSnackbarStatus(true);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  async function handleClick() {
    if (mobile.length === 0) {
      setMobileError("Mobile Number can't be empty");
      return;
    }
    if (isNaN(mobile) || mobile.length !== 10) {
      setMobileError("Invalid Mobile Number");
      return;
    }
    updateSnackbarStatus(false);
    setLoading(true);

    const response = await sendPasswordMail(mobile);

    setLoading(false);
    if (response.status) {
      setTimeout(() => {
        updateSnackbar(
          "Mail sent. Please, check your registered email.",
          "success"
        );
      }, 0);
      setMobile("");
      return;
    }

    setTimeout(() => {
      updateSnackbar(response.message, "error");
    }, 0);
  }

  return (
    <div className={classes.container}>
      <div className={classes.backButtonContainer}>
        <IconButton component={Link} to="/ap/login">
          <KeyboardBackspaceIcon />
        </IconButton>
      </div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.heading}
            gutterBottom
          >
            Forgot your password?
          </Typography>
          <Divider variant="middle" />
          <br />
          <div className={classes.content}>
            <Typography
              variant="body1"
              className={classes.content}
              color="textSecondary"
            >
              Enter your mobile number and we would send an email with further
              instrutions to your registered email address if the account
              exists.
            </Typography>
            <br />
            <div className={classes.textField}>
              <TextField
                autoFocus
                required
                label="Mobile no."
                variant="outlined"
                value={mobile}
                error={mobileError ? true : false}
                helperText={mobileError}
                onClick={() => setMobileError("")}
                onChange={(e) => setMobile(e.target.value)}
                className={classes.inputFields}
                fullWidth
              />
            </div>

            <div className={classes.loading}>
              {loading && <CircularProgress color="secondary" size={36} />}
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.sendEmailButton}
              size="large"
              onClick={handleClick}
            >
              Send Email
            </Button>
            <br />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-equally",
    background: "#f0f0f0",
  },
  backButtonContainer: {
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
  },
  card: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "50vw",
    minWidth: "400px",
    maxWidth: "600px",
    alignSelf: "center",
    height: "380px",
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
  loading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.5rem 0",
  },
  textField: {
    margin: "0.2rem 1rem",
    marginBottom: "0.5rem",
  },
  sendEmailButton: {
    width: "50%",
    alignSelf: "center",
  },
}));
