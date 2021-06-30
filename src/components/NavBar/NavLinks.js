import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import { useUser, useUserUpdate } from "../../contexts/UserContext";
import { useCart, useCartUpdate } from "../../contexts/CartContext";
import fetchCartItems from "../CartScreen/fetchCartItems";
import { usePincodesUpdate } from "../../contexts/PincodesContext";

const NavLinks = () => {
  const user = useUser();
  const updateUser = useUserUpdate();
  const updatePincodes = usePincodesUpdate();
  const cart = useCart();
  const updateCart = useCartUpdate();
  const classes = useStyles();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  function handleLogout() {
    updateUser(null);
    updatePincodes.updateUserPincode(null);
    localStorage.setItem("userDetails", null);
    localStorage.setItem("userPincode", null);
  }

  useEffect(() => {
    let mounted = true;

    async function getCartItems(userId) {
      const cartItems = await fetchCartItems(userId);
      if (mounted) updateCart(cartItems);
    }
    if (user) getCartItems(user.uid);

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      value={value}
      className={classes.navContainer}
      onChange={handleChange}
      aria-label="Site Navigation"
    >
      <Link to="/cart" className={classes.menuItem}>
        <IconButton onClick={(e) => {}}>
          <Badge badgeContent={cart ? cart.length : "0"} color="secondary">
            <ShoppingCartIcon className={classes.dropDownBtn} />
          </Badge>
        </IconButton>
      </Link>
      <IconButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
        <SettingsIcon className={classes.dropDownBtn} />
      </IconButton>
      <Menu
        anchorEl={anchorMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorMenu)}
        onClick={() => setAnchorMenu(!anchorMenu)}
      >
        <MenuItem>
          <Link to="/profile" className={classes.menuItem}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/my-orders" className={classes.menuItem}>
            My Orders
          </Link>
        </MenuItem>
        {user ? (
          <MenuItem onClick={handleLogout}>
            <Link
              to="/ap/login"
              style={{ textDecoration: "none", color: "#333" }}
            >
              Logout
            </Link>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link
              to="/ap/login"
              style={{ textDecoration: "none", color: "#333" }}
            >
              SignIn
            </Link>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default NavLinks;

const useStyles = makeStyles((theme) => ({
  navContainer: {
    width: "100%",
    display: "flex",
    gap: "0.25rem",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "2%",
    },
  },
  dropDownBtn: {
    fill: "#ffffff",
  },
  menuItem: {
    textDecoration: "none",
    color: "#000",
  },
}));
