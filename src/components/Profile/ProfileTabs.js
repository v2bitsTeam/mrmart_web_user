import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Profile from "./Profile";
import ChangePasswordTab from "./ChangePasswordTab";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const ProfileTabs = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isSnackbarActive, setSnackbarActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

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
    <Paper className={classes.root}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Profile" />
        <Tab label="Change Password" />
      </Tabs>
      <div role="tabpanel" hidden={selectedTab !== 0}>
        <Profile
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
      </div>
      <div role="tabpanel" hidden={selectedTab !== 1}>
        <ChangePasswordTab
          updateSnackbarStatus={updateSnackbarStatus}
          updateSnackbarMessage={updateSnackbarMessage}
          updateSnackbarSeverity={updateSnackbarSeverity}
        />
      </div>
      {isSnackbarActive && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </Paper>
  );
};

export default ProfileTabs;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    position: "relative",
    width: "80%",
    height: "100%",
    top: "17vh",
    marginBottom: "10rem",
    borderRadius: 6,
    background: "#f9f9f9",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2vh",
    },
  },
}));
