import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import PinIcon from "@material-ui/icons/Room";
import MenuIcon from "@material-ui/icons/Menu";
import NavLinks from "./NavLinks";
import DrawBar from "./DrawBar";
import { useProducts } from "../../contexts/ProductsContext";
import SearchSuggestions from "./SearchSuggestions";
import logoWhite from "../../assets/images/logo-white.png";
import ChooseLocationModal from "./ChooseLocationModal";
import { usePincodes, usePincodesUpdate } from "../../contexts/PincodesContext";
import fetchPincodes from "./fetchPincodes";
import Tooltip from "@material-ui/core/Tooltip";

const NavBar = ({
  ordersPage = false,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const products = useProducts();
  const pincodes = usePincodes();
  const updatePincodes = usePincodesUpdate();
  const [openSelectLocation, setOpenSelectLocation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchSuggestionsRef = useRef();
  const appBarRef = useRef();

  function clearSearch() {
    setSearchTerm("");
    setSearchSuggestions("");
  }

  function handleBlur(e) {
    if (appBarRef.current.contains(e.relatedTarget)) {
      return;
    }
    clearSearch();
  }

  function checkEscape(e) {
    if (e.key === "Escape") {
      clearSearch();
    }
  }

  useEffect(() => {
    let mounted = true;

    async function getPincodes() {
      const fetchedPincodes = await fetchPincodes();
      if (mounted) {
        updatePincodes.updatePincodes(fetchedPincodes);
      }
    }

    function checkPincodeInLocalStorage() {
      if (mounted) {
        let pincode = JSON.parse(localStorage.getItem("userPincode"));
        updatePincodes.updateUserPincode(pincode);
        if (user && !pincode) {
          setOpenSelectLocation(true);
        }
      }
    }

    checkPincodeInLocalStorage();
    getPincodes();

    return function cleanup() {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    if (searchTerm && mounted) {
      setSearchSuggestions([]);
      products.map((product) => {
        if (
          searchTerm.trim().length > 0 &&
          product.name.toLowerCase().includes(searchTerm)
        ) {
          setSearchSuggestions((current) => [product, ...current]);
        }
        return 1;
      });
    }

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.orderPageNavBar]: ordersPage,
      })}
    >
      <div className={classes.container} ref={appBarRef} onBlur={handleBlur}>
        <Hidden smUp>
          <IconButton aria-label="menu" onClick={() => setOpenDrawer(true)}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <DrawBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Hidden>
        <Hidden mdUp>
          <Tooltip
            arrow
            title={!user ? "Please, Login to update location" : ""}
            placement="bottom"
          >
            <div
              className={clsx(classes.userLocationContainer, {
                [classes.userLocationContainerFilled]: pincodes.userPincode,
                [classes.userLocationContainerEmpty]: !pincodes?.userPincode,
                [classes.userLocationContainerNoUser]: !user,
              })}
            >
              <IconButton
                color="primary"
                aria-label="choose location"
                className={classes.pinIconContainer}
                disabled={!user ? true : false}
                onClick={() => setOpenSelectLocation(true)}
              >
                <PinIcon
                  className={clsx(classes.pinIcon, {
                    [classes.pin]: pincodes?.userPincode,
                    [classes.noPin]: !pincodes?.userPincode,
                  })}
                />
              </IconButton>
              {user && pincodes?.userPincode ? (
                <div className={classes.userPinCode}>
                  {pincodes.userPincode.pincode}
                </div>
              ) : (
                <></>
              )}
              <ChooseLocationModal
                openSelectLocation={openSelectLocation}
                setOpenSelectLocation={setOpenSelectLocation}
                updateSnackbarStatus={updateSnackbarStatus}
                updateSnackbarMessage={updateSnackbarMessage}
                updateSnackbarSeverity={updateSnackbarSeverity}
              />
            </div>
          </Tooltip>
        </Hidden>

        <Link to="/" className={classes.logoImageContainer}>
          <img alt={"logo"} src={logoWhite} className={classes.logo} />
        </Link>
        {!ordersPage && (
          <Hidden xsDown>
            <div className={classes.searchAndSuggestionsWrapper}>
              <InputBase
                size="medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => checkEscape(e)}
                placeholder="Search for the product you like..."
                className={classes.search}
                startAdornment={
                  <InputAdornment position="start">
                    {<SearchIcon className={classes.searchIcon} />}
                  </InputAdornment>
                }
                classes={{ root: classes.input }}
              />
              <SearchSuggestions
                searchSuggestions={searchSuggestions}
                clearSearch={clearSearch}
                ref={searchSuggestionsRef}
              />
            </div>
          </Hidden>
        )}

        <div className={classes.nav}>
          <Hidden smDown>
            <Tooltip
              arrow
              title={!user ? "Please, Login to update location" : ""}
              placement="bottom"
            >
              <div
                className={clsx(classes.userLocationContainer, {
                  [classes.userLocationContainerFilled]: pincodes.userPincode,
                  [classes.userLocationContainerEmpty]: !pincodes?.userPincode,
                  [classes.userLocationContainerNoUser]: !user,
                })}
              >
                <IconButton
                  color="primary"
                  aria-label="choose location"
                  className={classes.pinIconContainer}
                  disabled={!user ? true : false}
                  onClick={() => setOpenSelectLocation(true)}
                >
                  <PinIcon
                    className={clsx(classes.pinIcon, {
                      [classes.pin]: pincodes?.userPincode,
                      [classes.noPin]: !pincodes?.userPincode,
                    })}
                  />
                </IconButton>
                {user && pincodes?.userPincode ? (
                  <div className={classes.userPinCode}>
                    {pincodes.userPincode.pincode}
                  </div>
                ) : (
                  <></>
                )}
                <ChooseLocationModal
                  openSelectLocation={openSelectLocation}
                  setOpenSelectLocation={setOpenSelectLocation}
                  updateSnackbarStatus={updateSnackbarStatus}
                  updateSnackbarMessage={updateSnackbarMessage}
                  updateSnackbarSeverity={updateSnackbarSeverity}
                />
              </div>
            </Tooltip>
          </Hidden>
          <NavLinks />
        </div>
      </div>
      <Hidden smUp>
        <Container className={classes.mobileSearchContainer}>
          {!ordersPage && (
            <div className={classes.mobileSearchAndSuggestionsWrapper}>
              <InputBase
                size="medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => checkEscape(e)}
                placeholder="Search for the product you like..."
                className={classes.mobileSearch}
                startAdornment={
                  <InputAdornment position="start">
                    {<SearchIcon className={classes.searchIcon} />}
                  </InputAdornment>
                }
              />
              <SearchSuggestions
                searchSuggestions={searchSuggestions}
                clearSearch={clearSearch}
                ref={searchSuggestionsRef}
              />
            </div>
          )}
        </Container>
      </Hidden>
    </AppBar>
  );
};

export default NavBar;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    height: "8vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      height: "16vh",
      flexDirection: "column",
      justifyContent: "space-around",
      alignContent: "center",
    },
  },
  orderPageNavBar: {
    height: "8vh",
  },
  container: {
    maxWidth: "1635px",
    width: "85%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("630px")]: {
      width: "100%",
      flexDirection: "column",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 auto",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  menuIcon: {
    color: "#fff",
  },
  userLocationContainer: {
    height: "90%",
    padding: "0.2rem",
    width: "5vw",
    minWidth: "50px",
    borderRadius: "0.4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0",
    // cursor: "pointer",
  },
  userLocationContainerEmpty: {
    backgroundColor: theme.palette.secondary.main,
  },
  userLocationContainerFilled: {
    backgroundColor: "#00897B",
  },
  userLocationContainerNoUser: {
    backgroundColor: "#ccc",
  },
  pinIconContainer: {
    width: "100%",
    padding: "0.2rem",
  },
  pinIcon: {
    fontSize: "1.4rem",
    "&:hover": {
      color: "#fff",
    },
  },
  noPin: {
    color: "#dfdfdf",
  },
  pin: {
    color: "#fff",
  },
  userPinCode: {
    fontSize: "0.8rem",
  },
  logoImageContainer: {
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    width: "100px",
  },
  logo: {
    height: "7vh",
    objectFit: "contain",
    [theme.breakpoints.up("630px")]: {
      alignSelf: "flex-start",
    },
    [theme.breakpoints.down("md")]: {
      width: "160px",
    },
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
      alignSelf: "center",
      paddingLeft: "5%",
    },
  },
  searchAndSuggestionsWrapper: {
    flexGrow: 1,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0 2rem",
    height: "90%",
  },
  search: {
    borderRadius: "2px",
    background: "#fff",
    color: "#000",
    width: "100%",
    height: "100%",
    fontSize: "1.2rem",

    [theme.breakpoints.down("md")]: {
      height: "100%",
      fontSize: "0.75rem",
    },
  },
  searchIcon: {
    paddingLeft: "1rem",
  },
  mobileSearchContainer: {
    height: "6vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileSearchAndSuggestionsWrapper: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  mobileSearch: {
    width: "100%",
    height: "6vh",
    borderRadius: "4px",
    color: "#000",
    background: "#fff",
    borderColor: "transparent",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
  },
}));
