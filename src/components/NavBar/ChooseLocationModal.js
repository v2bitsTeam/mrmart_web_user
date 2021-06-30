import React, { useState, useEffect, useRef } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { usePincodes, usePincodesUpdate } from "../../contexts/PincodesContext";
import PincodeSuggestions from "./PincodeSuggestions";
import { IconButton } from "@material-ui/core";

const ChooseLocationModal = ({
  openSelectLocation,
  setOpenSelectLocation,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeData, setPincodeData] = useState("");
  const pincodes = usePincodes();
  const updatePincodes = usePincodesUpdate();

  const searchSuggestionsRef = useRef();
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  function updateSnackbar(message, severity) {
    updateSnackbarStatus(true);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  function handleUpdateLocation() {
    setLoading(true);
    updateSnackbarStatus(false);
    let tempPincode = pincode.split("-")[0].trim();
    let allPincodes = [];
    pincodes.pincodes.map((current) => allPincodes.push(current.pincode));

    if (allPincodes.includes(tempPincode)) {
      updatePincodes.updateUserPincode(pincodeData);
      localStorage.setItem("userPincode", JSON.stringify(pincodeData));
      setTimeout(() => {
        updateSnackbar("Pincode updated successfully", "success");
      }, 0);
      setLoading(false);
      setOpenSelectLocation(false);
      return;
    }
    setTimeout(() => {
      updateSnackbar(
        "Sorry, We currently don't deliver to this pincode",
        "error"
      );
    }, 0);
    setLoading(false);
    return;
  }
  function clearSearch() {
    setSearchSuggestions("");
  }

  function handleRemoveLocation() {
    setLoading(true);
    updateSnackbarStatus(false);
    setPincode("");
    updatePincodes.updateUserPincode(null);
    localStorage.setItem("userPincode", null);
    setTimeout(() => {
      updateSnackbar("Pincode deleted successfully", "success");
    }, 0);
    setLoading(false);
  }

  useEffect(() => {
    let mounted = true;

    if (pincode && mounted) {
      setSearchSuggestions([]);
      pincodes?.pincodes?.map((currentPincode) => {
        if (
          pincode.trim().length > 0 &&
          currentPincode.pincode.toLowerCase().includes(pincode)
        ) {
          setSearchSuggestions((current) => [currentPincode, ...current]);
        }
        return 1;
      });
    }

    return function cleanup() {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pincode]);

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={openSelectLocation}
      onClose={() => setOpenSelectLocation(false)}
    >
      <DialogTitle id="form-dialog-title">
        <div className={classes.title}>
          <Typography variant="h6" component="span">
            Update your location
          </Typography>
          <Button
            color="secondary"
            onClick={() => setOpenSelectLocation(false)}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Container className={classes.headline}>
          <Typography align="left" variant="body1" component="h6">
            Search for your pincode and select relevant location.
          </Typography>
          <Tooltip
            arrow
            title={
              pincodes.userPincode ? "Click to remove current pincode" : ""
            }
            placement="bottom"
          >
            <IconButton
              aria-label="remove pincode"
              onClick={handleRemoveLocation}
              className={classes.removeIcon}
              disabled={!pincodes.userPincode ? true : false}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Container>
        <Container className={classes.pincodeSearchDialogContainer}>
          <TextField
            value={pincode}
            label="Search for your pincode"
            variant="outlined"
            size="medium"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {<SearchIcon />}
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPincode(e.target.value)}
          />
          {pincode && (
            <PincodeSuggestions
              setPincodeData={setPincodeData}
              setPincode={setPincode}
              className={classes.suggestions}
              searchSuggestions={searchSuggestions}
              clearSearch={clearSearch}
              ref={searchSuggestionsRef}
            />
          )}
        </Container>
        <div
          className="input-fields-arranger"
          style={
            loading
              ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : { display: "none" }
          }
        >
          <br />
          <CircularProgress />
          <br />
        </div>
        <Container className={classes.dialogContainer}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<CheckIcon />}
            onClick={handleUpdateLocation}
            className={classes.updateIcon}
            disabled={!pincode ? true : false}
          >
            Update
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<ClearIcon />}
            onClick={() => setPincode("")}
            disabled={!pincode ? true : false}
          >
            Clear
          </Button>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseLocationModal;

const useStyles = makeStyles((theme) => ({
  pincodeSearchDialogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2em",
    position: "relative",
  },
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2em",
    marginBottom: "2em",
  },
  headline: { marginBottom: "1em", display: "flex" },
  title: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removeIcon: {
    padding: "0 1rem",
    color: "#e53935",
    "&:hover": {
      color: "#c62828",
    },
  },
  searchInput: {
    width: "100%",
  },
  suggestions: {},
}));
