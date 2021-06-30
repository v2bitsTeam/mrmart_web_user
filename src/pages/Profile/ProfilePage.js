import React, { useState } from "react";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import { Redirect } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import CategoriesBar from "../../components/NavBar/CategoriesBar";
import { useUser } from "../../contexts/UserContext";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const ProfilePage = () => {
  const user = useUser();
  const [isSnackbarActive, setSnackbarActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  if (!user)
    return (
      <Redirect
        to={{
          pathname: "/ap/login",
          state: {
            message: "Please login to check your profile",
            severity: "info",
          },
        }}
      />
    );
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
      <NavBar
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      <CategoriesBar />
      <ProfileTabs />
      {isSnackbarActive && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default ProfilePage;
