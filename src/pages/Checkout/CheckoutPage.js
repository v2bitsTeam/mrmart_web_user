import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CategoriesBar from "../../components/NavBar/CategoriesBar";
import Checkout from "../../components/Checkout/Checkout";
import { useUser } from "../../contexts/UserContext";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const CheckoutPage = () => {
  const user = useUser();
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

  if (!user) return <Redirect to="/ap/login" />;

  return (
    <div>
      <NavBar
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      <CategoriesBar />
      <Checkout
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
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
      {isSnackbarActive && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default CheckoutPage;

const scrollToTopStyle = {
  position: "fixed",
  bottom: "6rem",
  right: "2rem",
  transform: "all 1s ease",
};
