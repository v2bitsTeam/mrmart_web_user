import React, { forwardRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const SearchSuggestions = ({ searchSuggestions, clearSearch }, ref) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.suggestions, {
        [classes.suggestionBoxShadow]: searchSuggestions.length > 0,
      })}
      ref={ref}
    >
      {searchSuggestions.length > 0 && (
        <div className={classes.searchSuggestions}>
          <List
            component="nav"
            aria-label="search box which shows search results"
            className={classes.suggestionsList}
          >
            {searchSuggestions.map((product, index) => (
              <ListItem
                button
                key={product.pid}
                onClick={clearSearch}
                divider={
                  index === searchSuggestions.length - 1 ? +false : +true
                }
              >
                <Link
                  to={{
                    pathname: `/prod-details/${product.pid}`,
                    state: { product },
                  }}
                  className={classes.suggestionNameLink}
                >
                  <ListItemText primary={product.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

const forwardedSearchSuggestions = forwardRef(SearchSuggestions);

export default forwardedSearchSuggestions;

const useStyles = makeStyles((theme) => ({
  suggestions: {
    background: "#fff",
    width: "100%",
    position: "absolute",
    top: "5.8vh",
    borderRadius: "0 0 0.4rem 0.4rem",
  },
  suggestionBoxShadow: {
    boxShadow: "0px 2px 2px 1px #333a",
  },
  searchSuggestions: {
    borderRadius: "0 0 0.4rem 0.4rem",
    background: "#fff",
    height: "100%",
  },
  suggestionNameLink: {
    width: "100%",
    color: "#333",
    textDecoration: "none",
  },
}));
