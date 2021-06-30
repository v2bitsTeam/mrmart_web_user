import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import Footer from "../../components/Footer/Footer";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const TermsAndConditionsPage = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  const [isSnackbarActive, setSnackbarActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  function toggleScrollVisibility() {
    if (window.pageYOffset > 300) {
      setIsScrollVisible(true);
      return;
    }
    setIsScrollVisible(false);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function updateSnackbarStatus(status) {
    setSnackbarActive(status);
  }

  function updateSnackbarMessage(message) {
    setSnackbarMessage(message);
  }
  function updateSnackbarSeverity(severity) {
    setSnackbarSeverity(severity);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.addEventListener("scroll", toggleScrollVisibility);
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ background: "#fafafa" }}>
      <NavBar
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      <TermsAndConditions />
      {isScrollVisible && (
        <Fab
          color="secondary"
          size="small"
          onClick={scrollToTop}
          aria-label="scroll back to top"
          style={scrollToTopStyle}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
      <Footer />
      {isSnackbarActive && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default TermsAndConditionsPage;

const scrollToTopStyle = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  transform: "all 1s ease",
};
