import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  useFeaturedProducts,
  useFeaturedProductsUpdate,
} from "../../contexts/FeaturedProductsContext";
import fetchProducts from "./fetchProducts";
import Product from "./Product";

const FeaturedProducts = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const products = useFeaturedProducts();
  const updateProducts = useFeaturedProductsUpdate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function getProducts() {
      const products = await fetchProducts();
      if (mounted) updateProducts(products);
    }
    getProducts();

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFeaturedProducts([]);
    products &&
      products.map((product) => {
        if (product.featured === "true" || product.featured === "yes") {
          setFeaturedProducts((prevList) => [product, ...prevList]);
        }
        return 1;
      });
  }, [products]);

  return (
    <div className={classes.featuredProductsContainer}>
      <Typography
        gutterBottom
        component="div"
        className={classes.featuredProductsTitle}
      >
        Check out our featured products
      </Typography>

      <Hidden only={["sm", "md", "lg", "xl"]}>
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className={classes.carousel}
          centerMode={true}
          centerSlidePercentage={50}
          thumbWidth={200}
          transitionTime={500}
          stopOnHover={true}
        >
          {featuredProducts &&
            featuredProducts.map((product) => (
              <div className={classes.featuredProduct} key={product.pid}>
                <Product
                  product={product}
                  updateSnackbarStatus={updateSnackbarStatus}
                  updateSnackbarMessage={updateSnackbarMessage}
                  updateSnackbarSeverity={updateSnackbarSeverity}
                />
              </div>
            ))}
        </Carousel>
      </Hidden>
      <Hidden only={["xs", "md", "lg", "xl"]}>
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className={classes.carousel}
          centerMode={true}
          centerSlidePercentage={40}
          thumbWidth={200}
          transitionTime={500}
        >
          {featuredProducts &&
            featuredProducts.map((product) => (
              <div className={classes.featuredProduct} key={product.pid}>
                <Product
                  product={product}
                  updateSnackbarStatus={updateSnackbarStatus}
                  updateSnackbarMessage={updateSnackbarMessage}
                  updateSnackbarSeverity={updateSnackbarSeverity}
                />
              </div>
            ))}
        </Carousel>
      </Hidden>
      <Hidden only={["xs", "sm", "lg", "xl"]}>
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className={classes.carousel}
          centerMode={true}
          centerSlidePercentage={30}
          thumbWidth={200}
          transitionTime={500}
        >
          {featuredProducts &&
            featuredProducts.map((product) => (
              <div className={classes.featuredProduct} key={product.pid}>
                <Product
                  product={product}
                  updateSnackbarStatus={updateSnackbarStatus}
                  updateSnackbarMessage={updateSnackbarMessage}
                  updateSnackbarSeverity={updateSnackbarSeverity}
                />
              </div>
            ))}
        </Carousel>
      </Hidden>
      <Hidden only={["sm", "md", "xs"]}>
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className={classes.carousel}
          centerMode={true}
          centerSlidePercentage={25}
          thumbWidth={200}
          transitionTime={500}
        >
          {featuredProducts &&
            featuredProducts.map((product) => (
              <div className={classes.featuredProduct} key={product.pid}>
                <Product
                  product={product}
                  updateSnackbarStatus={updateSnackbarStatus}
                  updateSnackbarMessage={updateSnackbarMessage}
                  updateSnackbarSeverity={updateSnackbarSeverity}
                />
              </div>
            ))}
        </Carousel>
      </Hidden>
    </div>
  );
};

export default FeaturedProducts;

const useStyles = makeStyles((theme) => ({
  featuredProductsContainer: {
    width: "96%",
    margin: "1rem auto",
    background: "#efefef",
  },
  featuredProductsTitle: {
    fontSize: "1.4rem",
    padding: "0.5rem 0.5rem",
    textAlign: "center",
    fontWeight: "500",
  },
  carousel: {
    padding: "1rem 0",
  },
  featuredProduct: {
    padding: "1rem",
  },
}));
