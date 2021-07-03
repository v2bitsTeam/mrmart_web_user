import React, { useState } from "react";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const ForgotPasswordPage = () => {
  const [isSnackbarActive, setSnackbarActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  function updateSnackbarStatus(status) {
    setSnackbarActive(status);
  }

  function updateSnackbarMessage(message) {
    setSnackbarMessage(message);
  }

  function updateSnackbarSeverity(severity) {
    setSnackbarSeverity(severity);
  }

  return (
    <div>
      <ForgotPassword
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      {isSnackbarActive && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
