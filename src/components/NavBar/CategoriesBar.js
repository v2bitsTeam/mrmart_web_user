import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import {
  useCategories,
  useCategoriesUpdate,
} from "../../contexts/CategoriesContext";
import {
  useSelectedCategoryId,
  useSelectedCategoryIdUpdate,
} from "../../contexts/SelectedCategoryId";
import fetchCategories from "./fetchCategories";

const CategoriesBar = () => {
  const classes = useStyles();
  const categories = useCategories();
  const selectedCategory = useSelectedCategoryId();
  const updateSelectedCategory = useSelectedCategoryIdUpdate();
  const updateCategories = useCategoriesUpdate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function getCategories() {
      const categories = await fetchCategories();
      if (mounted) updateCategories(categories);
    }
    getCategories();

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setFeaturedCategories([]);
      categories &&
        categories.map((category) => {
          if (featuredCategories.length < 6) {
            if (category.featured === "true" || category.featured === "yes") {
              setFeaturedCategories((prevList) => [category, ...prevList]);
            }
          }
          return 1;
        });
    }

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function scrollToProducts() {
    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  }

  const handleCategoryClick = (categoryId) => {
    updateSelectedCategory(categoryId);
    scrollToProducts();
    handleClose();
  };

  return (
    <div className={classes.categoriesWrapper}>
      <div className={classes.categoriesContainer} aria-label="Categories">
        <Button
          aria-label="open drawer"
          onClick={handleClick}
          className={
            selectedCategory === null ? classes.activeNavLink : classes.navLink
          }
        >
          <MenuIcon /> <span className={classes.menuTitle}>All</span>
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem
            onClick={() => handleCategoryClick(null)}
            className={
              selectedCategory === null
                ? classes.activeMenuItem
                : classes.menuItem
            }
          >
            <Link to="/" className={classes.menuLinks}>
              Show All
            </Link>
          </MenuItem>
          {categories &&
            categories.map((category) => (
              <MenuItem
                key={category.cid}
                onClick={() => handleCategoryClick(category.cid)}
                className={
                  selectedCategory === category.cid
                    ? classes.activeMenuItem
                    : classes.menuItem
                }
              >
                <Link to="/" className={classes.menuLinks}>
                  {category.category_name.toLowerCase()}
                </Link>
              </MenuItem>
            ))}
        </Menu>
        {featuredCategories &&
          featuredCategories.map((category, index) => {
            if (index < 7) {
              return (
                <Link
                  key={category.cid}
                  to="/"
                  color="textSecondary"
                  className={
                    selectedCategory === category.cid
                      ? classes.activeNavLink
                      : classes.navLink
                  }
                  onClick={() => handleCategoryClick(category.cid)}
                >
                  {category.category_name.toLowerCase()}
                </Link>
              );
            }
            return 1;
          })}
      </div>
    </div>
  );
};
export default CategoriesBar;

const useStyles = makeStyles((theme) => ({
  categoriesWrapper: {
    width: "100%",
    height: "6vh",
    marginTop: "8vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    position: "fixed",
    zIndex: 99,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  categoriesContainer: {
    maxWidth: "1635px",
    width: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".2rem 0",
    marginLeft: "0rem",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      gap: "0.5rem",
    },
  },
  menuTitle: {
    paddingLeft: "0.4rem",
    paddingTop: "0.1rem",
  },
  menuLinks: {
    textDecoration: "none",
    color: "#333",
  },
  menuItem: {
    textTransform: "capitalize",
  },
  activeMenuItem: {
    background: "#9999",

    textTransform: "capitalize",
    "&:hover": {
      background: "#9999",
    },
  },
  navLink: {
    color: "#cdcdcd",
    textDecoration: "none",
    fontSize: "1rem",
    textTransform: "capitalize",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
  activeNavLink: {
    color: "#fff",
    textDecoration: "none",
    textTransform: "capitalize",
  },
}));
