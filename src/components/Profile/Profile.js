import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import { mediaUrl } from "../../helpers/Constants";
import updateProfile from "./updateProfile";
import UserLogin from "../LogIn/UserLogin";
import { useUserUpdate } from "../../contexts/UserContext";

const Profile = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const updateUserData = useUserUpdate();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imageEdited, setImageEdited] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [imageError, setImageError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setUrl(mediaUrl + user.profile_image);
      setName(user.name);
      setMobile(user.mobile);
      setAddress(user.location);
      setCity(user.city);
      setState(user.state);
      setPinCode(user.pincode);
    }

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      user.profile_image ? setUrl(mediaUrl + user.profile_image) : setUrl("");
      setName(user.name);
      setMobile(user.mobile);
      setAddress(user.location);
      setCity(user.city);
      setState(user.state);
      setPinCode(user.pincode);
    }

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  const clearInputs = () => {
    setUrl("");
    setImage(null);
    setName("");
    setMobile("");
    setAddress("");
    setCity("");
    setState("");
    setPinCode("");
  };

  const clearErrors = () => {
    setImageError(null);
    setNameError("");
    setMobileError("");
    setAddressError("");
    setCityError("");
    setStateError("");
    setPinCodeError("");
    setUploadError("");
  };
  function updateSnackBar(status, message, severity) {
    updateSnackbarStatus(false);
    setTimeout(() => updateSnackbarStatus(status), 0);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

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
      setImageEdited(true);
      setImage(selected);
      setImageError("");
    } else {
      setImageEdited(false);
      setImage(null);
      setImageError("Invalid Image");
    }
  };

  async function handleSubmit() {
    let validString = /^[a-zA-Z][a-zA-Z\s][a-zA-Z\s]*$/;
    clearErrors();
    if (
      name === user.name &&
      (url !== null || url.split("images/")[1] === user.profile_image) &&
      mobile === user.mobile &&
      address === user.location &&
      city === user.city &&
      state === user.state &&
      pinCode === user.pincode &&
      !imageEdited
    ) {
      setEdit(!edit);
      setImageEdited(false);
      updateSnackBar(true, "Nothing to update", "info");

      return;
    }
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!name.match(validString)) {
      setNameError("Invalid Name");
      return;
    }
    if (!mobile) {
      setMobileError("Phone Number is required");
      return;
    }

    if (isNaN(mobile) || mobile.length !== 10) {
      setMobileError("Invalid Phone Number");
      return;
    }
    if (!address) {
      setAddressError("Address is required");
      return;
    }
    if (address.length < 3) {
      setAddressError("Invalid address");
      return;
    }
    if (!city) {
      setCityError("City is required");
      return;
    }
    if (!city.match(validString)) {
      setCityError("Invalid city");
      return;
    }
    if (!state) {
      setStateError("State is required");
      return;
    }
    if (!state.match(validString)) {
      setStateError("Invalid state");
      return;
    }
    if (!pinCode) {
      setPinCodeError("PinCode is required");
      return;
    }
    if (isNaN(pinCode) || pinCode.length !== 6) {
      setPinCodeError("Invalid PinCode");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("profile_image", image);
    formData.append("uid", user.uid);
    formData.append("name", name);
    formData.append("location", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pinCode);
    formData.append("imageEdited", imageEdited);
    if (imageEdited) {
      formData.append("oldimage", user.profile_image);
    }

    const response = await updateProfile(formData);

    if (response.status) {
      clearInputs();
      setUploading(false);

      const data = await UserLogin(user.mobile, user.password);
      if (data.role) {
        updateUserData(data);
        localStorage.setItem("userDetails", JSON.stringify(data));
        setEdit(!edit);
        setImageEdited(false);
        updateSnackBar(true, "Profile updated successfuly.", "success");
      }
      return;
    }
    updateSnackBar(true, response.message, "error");
  }

  if (!user) return <Redirect to="/ap/login" />;

  return (
    <div className={classes.profileContainer}>
      <div className={classes.AvatarContainer}>
        <Avatar src={url} alt={user.name[0]} className={classes.avatar}>
          {url ? "" : user.name[0]}
        </Avatar>
        {edit ? (
          <div className={classes.addImageContainer}>
            <input
              accept="image/*"
              className={classes.input}
              id="profile-pic-upload"
              type="file"
              onChange={handleImageVerification}
              hidden
            />
            <label htmlFor="profile-pic-upload" className={classes.plusButton}>
              +
            </label>
          </div>
        ) : (
          <></>
        )}
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
        <Tooltip
          arrow
          title="Mobile Number can't be edited"
          aria-label="Mobile number can't be edited"
          placement="top"
        >
          <TextField
            required
            label="Mobile Number"
            variant="outlined"
            value={mobile}
            disabled={true}
            error={mobileError ? true : false}
            helperText={mobileError}
            onClick={() => setMobileError("")}
            onChange={(e) => setMobile(e.target.value)}
            className={classes.inputFields}
            fullWidth
          />
        </Tooltip>
        <TextField
          autoFocus
          required
          label="Full Name"
          variant="outlined"
          value={name}
          disabled={!edit}
          error={nameError ? true : false}
          helperText={nameError}
          onClick={() => setNameError("")}
          onChange={(e) => setName(e.target.value)}
          className={classes.inputFields}
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
          disabled={!edit}
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
          disabled={!edit}
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
          disabled={!edit}
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
          disabled={!edit}
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
        {uploadError}
        <br />
      </Typography>
      <div
        className={classes.inputFieldsBlock}
        style={uploading ? { display: "block" } : { display: "none" }}
      >
        <br />
        <LinearProgress />
        <br />
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="secondary"
          className={!edit ? classes.editButton : classes.cancelButton}
          size="medium"
          onClick={() => setEdit(!edit)}
        >
          {edit ? "Cancel" : "Edit"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          size="medium"
          onClick={handleSubmit}
          disabled={!edit ? true : false}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Profile;

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    background: "#f3f3f3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },

  AvatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatar: {
    height: "100px",
    width: "100px",
    background: "#1c87e5",
  },
  addImageContainer: {
    background: "#cf0000",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: "1rem",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    width: 25,
    height: 25,
    fontSize: "1.6rem",
    padding: 0,
    margin: 0,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      marginTop: "-5px",
    },
  },
  inputFieldsBlock: {
    display: "flex",
    width: "80%",
    gap: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  textblock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",

      width: "100%",
    },
  },
  titleValues: {
    width: "300px",
  },
  buttons: {
    display: "flex",
    alignItems: " center",
    justifyContent: "center",
    gap: "1rem",
  },
  editButton: {
    background: "#fbc02d",
    padding: "0.6rem ",
    width: "150px",
    "&:hover": {
      background: "#f9a825",
    },
  },
  cancelButton: {
    background: "#e53935",
    padding: "0.6rem ",
    width: "150px",
    "&:hover": {
      background: "#d32f2f",
    },
  },
  submitButton: {
    padding: "0.6rem",
    width: "150px",
  },
}));
