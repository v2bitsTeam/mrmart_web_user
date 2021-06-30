import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import changePassword from "./changePassword";

const ChangePasswordTab = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState();
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [currentpasswordHidden, setCurrentPasswordHidden] = useState(false);
  const [newPasswordHidden, setNewPasswordHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const clearErrors = () => {
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
  };

  function updateSnackBar(status, message, severity) {
    updateSnackbarStatus(false);
    setTimeout(() => updateSnackbarStatus(status), 0);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  async function handleSubmit() {
    clearErrors();
    if (currentPassword.length === 0) {
      setCurrentPasswordError("Enter your current password");
      return;
    }
    if (newPassword.length === 0) {
      setNewPasswordError("New Password is required");
      return;
    }
    if (newPassword.length < 6) {
      setNewPasswordError("Minimum 6 characters long");
      setConfirmPassword("");
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords doesn't match");
      return;
    }
    if (currentPassword === newPassword) {
      updateSnackBar(true, "Nothing to update", "info");
      clearInputs();
      return;
    }
    setLoading(true);
    const response = await changePassword(
      user.uid,
      currentPassword,
      newPassword
    );

    if (response.status) {
      setLoading(false);
      clearInputs();
      updateSnackBar(true, "Password updated successfully", "success");
      return;
    }
    setLoading(false);
    clearInputs();
    updateSnackBar(
      true,
      "Something went wrong. Please, try again later",
      "error"
    );
  }

  return (
    <div className={classes.changePasswordContainer}>
      <div className={classes.textblock}>
        <Typography
          variant="h6"
          color="initial"
          className={classes.titleValues}
        >
          Current Password
        </Typography>
        <TextField
          autoFocus
          required
          label="Enter your current password"
          type={!currentpasswordHidden ? "password" : "text"}
          variant="outlined"
          value={currentPassword}
          error={currentPasswordError ? true : false}
          helperText={currentPasswordError}
          onClick={() => setCurrentPasswordError("")}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() => setCurrentPasswordHidden(!currentpasswordHidden)}
                style={{ cursor: "pointer" }}
              >
                {!currentpasswordHidden ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>
      <div className={classes.textblock}>
        <Typography
          variant="h6"
          color="initial"
          className={classes.titleValues}
        >
          New Password
        </Typography>
        <TextField
          required
          label="Choose a new password"
          type={!newPasswordHidden ? "password" : "text"}
          variant="outlined"
          value={newPassword}
          error={newPasswordError ? true : false}
          helperText={newPasswordError}
          onClick={() => setNewPasswordError("")}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() => setNewPasswordHidden(!newPasswordHidden)}
                style={{ cursor: "pointer" }}
              >
                {!newPasswordHidden ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>
      <div className={classes.textblock}>
        <Typography
          variant="h6"
          color="initial"
          className={classes.titleValues}
        >
          Verify Password
        </Typography>
        <TextField
          required
          label="Re-enter the new password"
          type={!newPasswordHidden ? "password" : "text"}
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
                onClick={() => setNewPasswordHidden(!newPasswordHidden)}
                style={{ cursor: "pointer" }}
              >
                {!newPasswordHidden ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>
      <br />
      {loading ? <CircularProgress color="secondary" size={36} /> : ""}
      <br />
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        size="large"
        onClick={handleSubmit}
        disabled={loading ? true : false}
      >
        Submit
      </Button>
    </div>
  );
};

export default ChangePasswordTab;

const useStyles = makeStyles((theme) => ({
  changePasswordContainer: {
    background: "#f3f3f3",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 0.5rem",
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
    },
  },
  titleValues: {
    width: "300px",
  },
  submitButton: {
    padding: "1rem",
    width: "240px",
  },
}));
