import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import { useProducts, useProductsUpdate } from "../../contexts/ProductsContext";
import { useSelectedCategoryId } from "../../contexts/SelectedCategoryId";
import fetchProducts from "./fetchProducts";

export const Products = ({
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const products = useProducts();
  const selectedCategory = useSelectedCategoryId();
  const updateProducts = useProductsUpdate();

  useEffect(() => {
    let mounted = true;

    async function getProducts(selectedCategory) {
      const products = await fetchProducts(selectedCategory);
      if (mounted) updateProducts(products);
    }
    getProducts(selectedCategory);

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className={classes.productsWrapper}>
      <Grid container className={classes.root}>
        {products ? (
          products.map((product) => (
            <Grid
              className={classes.gridItem}
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
            >
              <Product
                className={classes.product}
                product={product}
                updateSnackbarStatus={updateSnackbarStatus}
                updateSnackbarMessage={updateSnackbarMessage}
                updateSnackbarSeverity={updateSnackbarSeverity}
              />
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};
export default Products;

const useStyles = makeStyles((theme) => ({
  productsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    margin: "0 auto",
    paddingBottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  root: {
    width: "90%",
    margin: 0,
    marginTop: "2vh",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      gap: 0,
    },
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "200px",
    padding: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      minWidth: "180px",
      padding: theme.spacing(1),
    },
  },
}));
