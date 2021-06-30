import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import CategoriesBar from "../../components/NavBar/CategoriesBar";
import ProductsBanner from "../../components/ProductCard/ProductsBanner";
import FeaturedProducts from "../../components/ProductCard/FeaturedProducts";
import Products from "../../components/ProductCard/Products";
import FeaturedCategories from "../../components/ProductCard/FeaturedCategories";
import Footer from "../../components/Footer/Footer";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { FeaturedProductsProvider } from "../../contexts/FeaturedProductsContext";
import { useUserUpdate } from "../../contexts/UserContext";
import Splash from "../../components/Splash/Splash";
import { useSplash, useSplashUpdate } from "../../contexts/SplashContext";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";

const HomePage = ({ location }) => {
  const splash = useSplash();
  const updateSplash = useSplashUpdate();
  const updateUserLoginStatus = useUserUpdate();
  const [isSnackbarActive, setSnackbarActive] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  let fromLogin = location?.state?.fromLogin ?? false;

  const [isScrollVisible, setIsScrollVisible] = useState(false);

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

  function initialSetup() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      updateUserLoginStatus(userDetails);
    }
    updateSplash();
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
    let isMounted = true;
    if (isMounted) {
      setTimeout(initialSetup, 2000);
      window.addEventListener("scroll", toggleScrollVisibility);
    }

    return function cleanup() {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (splash && !fromLogin) return <Splash />;
  return (
    <FeaturedProductsProvider style={{ background: "#fafafa" }}>
      <NavBar
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      <CategoriesBar />
      <ProductsBanner />
      <FeaturedProducts
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      <Products
        updateSnackbarStatus={updateSnackbarStatus}
        updateSnackbarMessage={updateSnackbarMessage}
        updateSnackbarSeverity={updateSnackbarSeverity}
      />
      <FeaturedCategories />
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
    </FeaturedProductsProvider>
  );
};

export default HomePage;

const scrollToTopStyle = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  transform: "all 1s ease",
};
