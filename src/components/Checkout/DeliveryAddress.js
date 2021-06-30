import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { usePincodes } from "../../contexts/PincodesContext";

const ControlAddress = ({
  changeAddress,
  setChangeAddress,
  location,
  setLocation,
  deliveryInstructions,
  setDeliveryInstructions,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();
  const pincodes = usePincodes();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [locationError, setLocationError] = useState("");
  const [deliveryInstructionsError, setDeliveryInstructionsError] =
    useState("");

  function updateSnackBar(status, message, severity) {
    updateSnackbarStatus(false);
    setTimeout(() => updateSnackbarStatus(status), 0);
    updateSnackbarMessage(message);
    updateSnackbarSeverity(severity);
  }

  function submitChange() {
    if (!location) {
      setLocationError("Address is required");
      return;
    } else if (location.length < 3) {
      setLocationError("Invalid address");
      return;
    }

    updateSnackBar(true, "Address updated successfully.", "success");
    setChangeAddress(false);
  }

  return !changeAddress ? (
    <div>
      <Typography className={classes.currentAdress} variant="subtitle1">
        <span className={classes.subTitles}>Address:</span>{" "}
        {location ? `${location},` : user.location}
      </Typography>
      <Typography
        className={classes.currentAdress}
        variant="subtitle1"
        style={{ paddingLeft: "4.5rem" }}
      >
        {pincodes?.userPincode &&
          `${pincodes?.userPincode?.address}, ${pincodes?.userPincode?.pincode}`}
      </Typography>
      <Typography className={classes.currentAdress} variant="subtitle1">
        {deliveryInstructions ? (
          <div>
            <span className={classes.subTitles}>Instructions:</span>{" "}
            {deliveryInstructions}
          </div>
        ) : (
          ""
        )}
      </Typography>
    </div>
  ) : (
    <Container className={classes.editAddress}>
      <Typography className={classes.AddressTitle} variant="h6">
        Change Address
      </Typography>
      <Container component="form" className={classes.formfield}>
        <TextField
          label="Address"
          variant="outlined"
          value={location}
          error={locationError ? true : false}
          helperText={locationError}
          onClick={() => setLocationError("")}
          onChange={(e) => setLocation(e.target.value)}
          className={classes.inputFields}
        />
        <br />

        <TextField
          label="City"
          variant="outlined"
          value={pincodes?.userPincode?.address}
          disabled={true}
          className={classes.inputFields}
        />
        <br />
        <TextField
          label="Pincode"
          variant="outlined"
          value={pincodes?.userPincode?.pincode}
          disabled={true}
          className={classes.inputFields}
        />
        <br />
        <TextField
          label="Delivery Instructions"
          variant="outlined"
          value={deliveryInstructions}
          error={deliveryInstructionsError ? true : false}
          helperText={deliveryInstructionsError}
          onClick={() => setDeliveryInstructionsError("")}
          onChange={(e) => setDeliveryInstructions(e.target.value)}
          className={classes.inputFields}
        />
        <br />
        <div className={classes.saveBtnWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.saveBtn}
            onClick={submitChange}
          >
            Save
          </Button>
        </div>
      </Container>
    </Container>
  );
};

const DeliveryAddress = ({
  location,
  setLocation,
  deliveryInstructions,
  setDeliveryInstructions,
  updateSnackbarStatus,
  updateSnackbarMessage,
  updateSnackbarSeverity,
}) => {
  const classes = useStyles();

  const [changeAddress, setChangeAddress] = useState(false);

  const editAddress = () => {
    setChangeAddress(!changeAddress);
  };
  return (
    <Container className={classes.AccordionWrapper}>
      <Box className={classes.mainTwoBlock}>
        <Box style={{ alignSelf: "flex-end" }}>
          <Button
            className={!changeAddress ? classes.editBtn : classes.cancelBtn}
            variant="contained"
            onClick={editAddress}
            size="small"
          >
            {!changeAddress ? "Edit" : "Cancel"}
          </Button>
        </Box>
        <Box className={classes.twoBlockFlex}>
          <ControlAddress
            changeAddress={changeAddress}
            setChangeAddress={setChangeAddress}
            location={location}
            setLocation={setLocation}
            deliveryInstructions={deliveryInstructions}
            setDeliveryInstructions={setDeliveryInstructions}
            updateSnackbarStatus={updateSnackbarStatus}
            updateSnackbarMessage={updateSnackbarMessage}
            updateSnackbarSeverity={updateSnackbarSeverity}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default DeliveryAddress;

const useStyles = makeStyles((theme) => ({
  mainTwoBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  AddressTitle: {
    paddingBottom: "2rem",
  },
  currentAdress: {
    marginLeft: "0.5rem",
    fontWeight: "600",
  },
  formfield: {
    margin: "1rem 0",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  space: {
    display: "block",
  },
  textfield: {
    marginBottom: "1.4rem",
    paddingRight: "1rem",
  },
  inputFields: {
    width: "100%",
    // minWidth: "250px",
  },
  subTitles: {
    color: "#898989",
    fontWeight: "500",
  },
  saveBtnWrapper: {
    alignSelf: "center",
  },
  editBtn: {
    background: "#ffc107",
    "&:hover": {
      background: "#FFB000",
    },
  },
  cancelBtn: {
    background: "#e53935",
    color: "#fff",
    "&:hover": {
      background: "#E64A19",
    },
  },
  saveBtn: {
    width: 100,
    height: 40,
  },
}));
