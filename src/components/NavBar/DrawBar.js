import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Tab from "@material-ui/core/Tab";
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useCategories } from "../../contexts/CategoriesContext";
import {
  useSelectedCategoryId,
  useSelectedCategoryIdUpdate,
} from "../../contexts/SelectedCategoryId";

const DrawBar = ({ openDrawer, setOpenDrawer }) => {
  const classes = useStyles();
  const categories = useCategories();
  const selectedCategory = useSelectedCategoryId();
  const updateSelectedCategory = useSelectedCategoryIdUpdate();

  const handleTabClick = (categoryId) => {
    updateSelectedCategory(categoryId);
    scrollToProducts();
    setOpenDrawer(false);
  };

  function scrollToProducts() {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  }

  return (
    <ThemeProvider theme={mobileTheme}>
      <Drawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onEscapeKeyDown={() => {
          setOpenDrawer(false);
        }}
        onBackdropClick={() => {
          setOpenDrawer(false);
        }}
      >
        <Link to="/" className={classes.menuLinks}>
          <Tab
            style={
              selectedCategory === null ? { backgroundColor: "#858585" } : {}
            }
            className={classes.drawerItem}
            label="Show All"
            onClick={() => handleTabClick(null)}
          />
        </Link>
        {categories &&
          categories.map((category) => (
            <Link key={category.id} to="/" className={classes.menuLinks}>
              <Tab
                style={
                  selectedCategory === category.cid
                    ? { backgroundColor: "#858585" }
                    : {}
                }
                className={classes.drawerItem}
                label={category.category_name}
                onClick={() => handleTabClick(category.cid)}
              />
            </Link>
          ))}
      </Drawer>
    </ThemeProvider>
  );
};

export default DrawBar;

const useStyles = makeStyles({
  dropDownBtn: {
    fill: "#fff",
  },

  menuLinks: {
    textDecoration: "none",
    color: "#333",
  },
  drawerItem: {
    width: "100%",
    color: "#fff",
    opacity: "1",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "#555",
    },
  },
});

const mobileTheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiDrawer: {
      // Name of the rule
      paper: {
        backgroundColor: "#444",
        paddingTop: 60,
        width: "200px",
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.15)",
      },
    },
  },
});
