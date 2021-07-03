import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginBg from "../../assets/images/login-bg-right.jpg";
import Hidden from "@material-ui/core/Hidden";
import userLogin from "./userLogin";
import { useUserUpdate } from "../../contexts/UserContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import logoOrange from "../../assets/images/logo-orange.png";
import logoWhite from "../../assets/images/logo-white.png";

const LogIn = () => {
  const classes = useStyles();
  const updateUserLoginStatus = useUserUpdate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);

  const clearInputs = () => {
    setPhone("");
    setPassword("");
  };

  const clearErrors = () => {
    setPhoneError("");
    setPasswordError("");
    setAuthError("");
  };

  const handleSubmit = async () => {
    clearErrors();

    if (phone.length === 0) {
      setPhoneError("Mobile Number can't be empty");
      return;
    }
    if (isNaN(phone) || phone.length !== 10) {
      setPhoneError("Invalid Phone Number");
      return;
    }
    if (password.length === 0) {
      setPasswordError("Password can't be empty");
      return;
    }
    setLoading(true);

    const user = await userLogin(phone, password);
    setLoading(false);
    if (user.role) {
      clearInputs();
      updateUserLoginStatus(user);
      localStorage.setItem("userDetails", JSON.stringify(user));
      return;
    }
    setAuthError(user);
  };

  useEffect(() => {
    let isMounted = true;
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (isMounted && userDetails) {
      updateUserLoginStatus(userDetails);
      return;
    }
    return () => {
      isMounted = false;
    };
  }, [updateUserLoginStatus]);

  return (
    <div className={classes.logInPageContainer}>
      <div className={classes.bg}>
        <div className={classes.bgOverlay}></div>
        <img alt={"logo"} src={logoWhite} className={classes.logo} />
      </div>
      <div className={classes.loginBlock}>
        <Hidden mdUp>
          <img alt={"logo"} src={logoOrange} className={classes.mobileLogo} />
        </Hidden>
        <Typography variant="h5" color="initial" className={classes.loginTitle}>
          LogIn
        </Typography>
        <br />
        <TextField
          autoFocus
          required
          label="Mobile Number"
          variant="outlined"
          value={phone}
          error={phoneError ? true : false}
          helperText={phoneError}
          onClick={() => setPhoneError("")}
          onChange={(e) => setPhone(e.target.value)}
          className={classes.inputFields}
        />
        <br />
        <TextField
          required
          type={!passwordHidden ? "password" : "text"}
          label="Password"
          variant="outlined"
          value={password}
          error={passwordError ? true : false}
          helperText={passwordError}
          onClick={() => setPasswordError("")}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() => setPasswordHidden(!passwordHidden)}
                style={{ cursor: "pointer" }}
              >
                {!passwordHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </InputAdornment>
            ),
          }}
          className={classes.inputFields}
        />

        <br />

        {loading ? <CircularProgress color="secondary" size={36} /> : ""}
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.loginButton}
          size="large"
          onClick={handleSubmit}
          disabled={loading ? true : false}
        >
          Login
        </Button>
        {authError && <CustomSnackbar message={authError} severity={"error"} />}

        <br />
        <br />
        <Typography color="secondary">
          <Link to="/ap/forgot-password" className={classes.links}>
            Forgot Password?
          </Link>
        </Typography>
        <br />
        <Typography color="secondary">
          Don't have an Account?{" "}
          <Link to="/ap/signup" className={classes.links}>
            Signup
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LogIn;

const useStyles = makeStyles((theme) => ({
  logInPageContainer: {
    boxSizing: "border-box",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
    },
  },
  bg: {
    width: "70%",
    background: `url(${LoginBg}) center/cover no-repeat`,
    position: "relative",
    [theme.breakpoints.down("md")]: {
      backgroundPosition: "center ",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  bgOverlay: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
    background: "#1117",
  },
  logo: {
    position: "absolute",
    zIndex: 1,
    marginTop: "2rem",
    marginLeft: "4rem",

    height: "14vh",
    objectFit: "contain",
  },
  loginBlock: {
    backgroundColor: "#f9f9f9",
    width: "30%",
    minWidth: "350px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "#fff",
      width: "95vw",
      padding: "1rem 0",
      minWidth: "300px",

      alignItems: "center",
      justifyContent: "center",
    },
  },
  mobileLogo: {
    height: "10vh",
    padding: "1rem 0",
    objectFit: "contain",
  },
  loginTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  inputFields: {
    width: "90%",
  },
  loginButton: {
    width: "90%",
  },
  links: {
    textDecoration: "none",
    color: "#1A237E",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
