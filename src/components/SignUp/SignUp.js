import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SignUpBg from "../../assets/images/login-bg-left.jpg";
import Hidden from "@material-ui/core/Hidden";
import UserSignUp from "./UserSignUp";
import { useUserUpdate } from "../../contexts/UserContext";
import logoOrange from "../../assets/images/logo-orange.png";
import logoWhite from "../../assets/images/logo-white.png";

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const SignUp = () => {
  const classes = useStyles();
  const updateUserLoginStatus = useUserUpdate();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [imageError, setImageError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(false);

  const clearInputs = () => {
    setUrl("");
    setImage(null);
    setFullName("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");
    setCity("");
    setState("");
    setPinCode("");
  };

  const clearErrors = () => {
    setImageError(null);
    setNameError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAddressError("");
    setCityError("");
    setStateError("");
    setPinCodeError("");
    setUploadError("");
  };

  const handleImageVerification = (e) => {
    setImageError("");
    const selected = e.target.files[0];
    const imageReader = new FileReader();

    imageReader.onload = () => {
      if (imageReader.readyState === 2) {
        setUrl(imageReader.result);
      }
    };

    selected && imageReader.readAsDataURL(selected);
    if (selected && imageTypes.includes(selected.type)) {
      setImage(selected);
      setImageError("");
    } else {
      setImage(null);
      setImageError("Invalid Image");
    }
  };

  const handleSubmit = async () => {
    let validString = /^[a-zA-Z][a-zA-Z\s][a-zA-Z\s]*$/;

    clearErrors();
    if (!fullName) {
      setPassword("");
      setConfirmPassword("");
      setNameError("Name is required");
      return;
    }
    if (
      !fullName.match(/^[a-zA-Z]+$/) &&
      !fullName.match(/^[a-zA-Z]+ [a-zA-Z]+$/) &&
      !fullName.match(/^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/)
    ) {
      setPassword("");
      setConfirmPassword("");
      setNameError("Invalid Name");
      return;
    }
    if (!phone) {
      setPassword("");
      setConfirmPassword("");
      setPhoneError("Phone Number is required");
      return;
    }

    if (isNaN(phone) || phone.length !== 10) {
      setPhoneError("Invalid Phone Number");
      return;
    }
    if (!password) {
      setPassword("");
      setConfirmPassword("");
      setPasswordError("Password is required");
      return;
    }
    if (password.length < 6) {
      setPassword("");
      setConfirmPassword("");
      setPasswordError("password must be atleast 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setConfirmPasswordError("Password doesn't match");
      return;
    }
    if (!address) {
      setPassword("");
      setConfirmPassword("");
      setAddressError("Address is required");
      return;
    }
    if (address.length < 3) {
      setPassword("");
      setConfirmPassword("");
      setAddressError("Invalid address");
      return;
    }
    if (!city) {
      setPassword("");
      setConfirmPassword("");
      setCityError("City is required");
      return;
    }
    if (!city.match(validString)) {
      setPassword("");
      setConfirmPassword("");
      setCityError("Invalid city");
      return;
    }
    if (!state) {
      setPassword("");
      setConfirmPassword("");
      setStateError("State is required");
      return;
    }
    if (!state.match(validString)) {
      setPassword("");
      setConfirmPassword("");
      setStateError("Invalid state");
      return;
    }
    if (!pinCode) {
      setPassword("");
      setConfirmPassword("");
      setPinCodeError("PinCode is required");
      return;
    }
    if (isNaN(pinCode) || pinCode.length !== 6) {
      setPassword("");
      setConfirmPassword("");
      setPinCodeError("Invalid PinCode");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("mobile", phone);
    formData.append("password", password);
    formData.append("location", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pinCode);
    formData.append("profile_image", image === null ? "" : image);
    console.log(image);
    const response = await UserSignUp(formData);
    console.log(response);
    if (response.status) {
      clearInputs();
      setUploading(false);
      setSignUpSuccess(true);
      return;
    }
    setUploadError(response.message);
    clearInputs();
    setUploading(false);
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

  if (signUpSuccess)
    return (
      <Redirect
        to={{
          pathname: "/ap/login",
          state: {
            message: "Signup successful. Please, login to continue.",
            severity: "success",
          },
        }}
      />
    );

  return (
    <div className={classes.signUpPageContainer}>
      <div className={classes.signUpBlock}>
        <Hidden mdUp>
          <img alt={"logo"} src={logoOrange} className={classes.mobileLogo} />
        </Hidden>
        <Typography
          variant="h5"
          color="initial"
          className={classes.signUpTitle}
        >
          SignUp
        </Typography>
        <br />
        <div className={classes.AvatarContainer}>
          <Avatar alt="Profile Pic" src={url} className={classes.avatar} />
          <div className={classes.addImageContainer}>
            <input
              accept="image/*"
              className={classes.input}
              id="profile-image-upload"
              type="file"
              onChange={handleImageVerification}
              hidden
            />
            <label
              htmlFor="profile-image-upload"
              className={classes.plusButton}
            >
              +
            </label>
          </div>
        </div>
        <br />
        <Typography
          color="error"
          align="left"
          style={imageError ? {} : { display: "none" }}
        >
          <br /> {imageError}
        </Typography>
        <br />
        <div className={classes.inputFieldsBlock}>
          <TextField
            autoFocus
            required
            label="Full Name"
            variant="outlined"
            value={fullName}
            error={nameError ? true : false}
            helperText={nameError}
            onClick={() => setNameError("")}
            onChange={(e) => setFullName(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
          <TextField
            required
            label="Phone"
            variant="outlined"
            value={phone}
            error={phoneError ? true : false}
            helperText={phoneError}
            onClick={() => setPhoneError("")}
            onChange={(e) => setPhone(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
        </div>
        <br />
        <div className={classes.inputFieldsBlock}>
          <TextField
            required
            type={!passwordHidden ? "password" : "text"}
            label="Password"
            variant="outlined"
            error={passwordError ? true : false}
            helperText={passwordError}
            value={password}
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
            fullWidth
          />
          <TextField
            required
            type={!passwordHidden ? "password" : "text"}
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            error={confirmPasswordError ? true : false}
            helperText={confirmPasswordError}
            onClick={() => setConfirmPasswordError("")}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            fullWidth
          />
        </div>
        <br />

        <div className={classes.inputFieldsBlock}>
          <TextField
            required
            label="Address"
            variant="outlined"
            size="medium"
            value={address}
            error={addressError ? true : false}
            helperText={addressError}
            onClick={clearErrors}
            onChange={(e) => setAddress(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
          <TextField
            required
            label="City"
            variant="outlined"
            size="medium"
            value={city}
            error={cityError ? true : false}
            helperText={cityError}
            onClick={clearErrors}
            onChange={(e) => setCity(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
        </div>
        <br />
        <div className={classes.inputFieldsBlock}>
          <TextField
            required
            label="State"
            variant="outlined"
            size="medium"
            value={state}
            error={stateError ? true : false}
            helperText={stateError}
            onClick={clearErrors}
            onChange={(e) => setState(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
          <TextField
            required
            label="PinCode"
            variant="outlined"
            size="medium"
            value={pinCode}
            error={pinCodeError ? true : false}
            helperText={pinCodeError}
            onClick={clearErrors}
            onChange={(e) => setPinCode(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
        </div>
        <br />
        <Typography
          color="error"
          align="left"
          style={uploadError ? {} : { display: "none" }}
        >
          <br /> {uploadError}
        </Typography>
        <br />
        <div
          className={classes.inputFieldsBlock}
          style={uploading ? { display: "block" } : { display: "none" }}
        >
          <br />
          <LinearProgress />
          <br />
        </div>
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ width: "45%" }}
          size="large"
          onClick={handleSubmit}
          disabled={uploading ? true : false}
        >
          SIGNUP
        </Button>
        <br />
        <Typography color="secondary">
          Have an Account?{" "}
          <Link to="/ap/login" className={classes.link}>
            Login here
          </Link>
        </Typography>
      </div>
      <div className={classes.bg}>
        <div className={classes.bgOverlay}></div>
        <img alt={"logo"} src={logoWhite} className={classes.logo} />
      </div>
    </div>
  );
};

export default SignUp;

const useStyles = makeStyles((theme) => ({
  signUpPageContainer: {
    boxSizing: "border-box",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  signUpBlock: {
    width: "50%",
    minWidth: "400px",
    marginTop: "1rem",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "60%",
      marginBottom: "1rem",
      padding: "1rem 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      minWidth: "300px",

      width: "90%",
      padding: "0",
    },
  },
  AvatarContainer: {
    position: "relative",
  },
  avatar: {
    height: "100px",
    width: "100px",
  },
  addImageContainer: {
    background: "#cf0000",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: "1rem",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-85%, -55%)",
    // background: "#333",
    padding: 0,
    margin: 0,
    // width: "100%",
    // height: "100%",
    color: "#fff",
  },
  inputFields: {
    width: "90%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  inputFieldsBlock: {
    display: "flex",
    width: "90%",
    gap: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  mobileLogo: {
    height: "10vh",
    padding: "1rem 0",
    objectFit: "contain",
  },
  signUpTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  link: {
    textDecoration: "none",
    color: "#1A237E",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  bg: {
    width: "50%",
    background: `url(${SignUpBg}) center/cover no-repeat`,
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
    right: "4rem",
    height: "14vh",
    objectFit: "contain",
  },
}));
