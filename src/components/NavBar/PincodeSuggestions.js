import React, { forwardRef } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const PincodeSuggestions = (
  { setPincode, setPincodeData, searchSuggestions, clearSearch },
  ref
) => {
  const classes = useStyles();

  function updatePincode(pincodeData) {
    clearSearch();
    setPincode(`${pincodeData.pincode} - ${pincodeData.address}`);
    setPincodeData(pincodeData);
  }

  return (
    <div
      className={clsx(classes.suggestions, {
        [classes.suggestionsExist]: searchSuggestions.length > 0,
      })}
      ref={ref}
    >
      {searchSuggestions.length > 0 && (
        <div className={classes.searchSuggestions}>
          <List
            component="nav"
            aria-label="search for your location pincode and select appropriate one."
            className={classes.suggestionsList}
          >
            {searchSuggestions.map((pincodeData, index) => (
              <ListItem
                button
                key={pincodeData.id}
                onClick={() => updatePincode(pincodeData)}
                divider={
                  index === searchSuggestions.length - 1 ? +false : +true
                }
              >
                <ListItemText
                  primary={`${pincodeData.pincode} - ${pincodeData.address}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

const forwardedPincodeSuggestions = forwardRef(PincodeSuggestions);

export default forwardedPincodeSuggestions;

const useStyles = makeStyles((theme) => ({
  suggestions: {
    background: "#fff",
    width: "100%",
    position: "relative",
    top: "0vh",
    borderRadius: "0 0 0.4rem 0.4rem",
    zIndex: 99,
  },
  suggestionsExist: {
    boxShadow: "0px 2px 2px 1px #3335",
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
