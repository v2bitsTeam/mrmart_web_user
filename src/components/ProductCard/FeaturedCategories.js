import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { useCategories } from "../../contexts/CategoriesContext";
import { useSelectedCategoryIdUpdate } from "../../contexts/SelectedCategoryId";
import { mediaUrl } from "../../helpers/Constants";

const FeaturedCategories = () => {
  const classes = useStyles();
  const categories = useCategories();
  const updateSelectedCategory = useSelectedCategoryIdUpdate();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  function handleItemClick(categoryId) {
    updateSelectedCategory(categoryId);
    window.scrollTo({
      top: 700,
      behavior: "smooth",
    });
  }

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

  return (
    <div className={classes.featuredCategoriesContainer}>
      <Typography
        gutterBottom
        component="div"
        className={classes.featuredCategoriesTitle}
      >
        Our Popular Categories
      </Typography>
      <div className={classes.featuredCategoryItems}>
        {featuredCategories &&
          featuredCategories.map((category) => (
            <div
              key={category.cid}
              className={classes.featuredCategoryItem}
              onClick={() => handleItemClick(category.cid)}
            >
              <img
                src={mediaUrl + category.category_image}
                alt={category.category_name}
                className={classes.categoryImage}
              />
              <Typography
                gutterBottom
                component="div"
                className={classes.categoryName}
              >
                {category.category_name.toLowerCase()}
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;

const useStyles = makeStyles((theme) => ({
  featuredCategoriesContainer: {
    maxWidth: "1635px",
    width: "85%",
    margin: "1rem auto",
    background: "#efefef",
  },
  featuredCategoriesTitle: {
    fontSize: "1.4rem",
    padding: "0.5rem 0.5rem",
    textAlign: "center",
    fontWeight: "500",
  },
  featuredCategoryItems: {
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "1rem",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 0.5rem",
      gap: "0.4rem",
    },
  },
  featuredCategoryItem: {
    width: "200px",
    height: "200px",
    background: "#fff",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      width: "150px",
      height: "150px",
      gap: "0.1rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "135px",
      height: "135px",
      gap: "0.1rem",
    },
  },
  categoryImage: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      width: "120px",
      height: "120px",
    },
  },
  categoryName: {
    fontSize: "1rem",
    fontWeight: "500",
    textTransform: "capitalize",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
}));
