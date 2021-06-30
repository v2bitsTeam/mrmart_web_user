import React from "react";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import makeStyles from "@material-ui/core/styles/makeStyles";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <RadioGroup
        aria-label="payment options"
        value={paymentMethod}
        onChange={handleChange}
      >
        <FormControlLabel
          value="COD"
          control={<Radio />}
          label="Cash On Delivery"
        />
        <FormControlLabel
          value="Online"
          control={<Radio />}
          label="Online Payment"
        />
      </RadioGroup>
    </Box>
  );
};

export default PaymentOptions;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "3rem",
    paddingBottom: "1rem",
  },
}));
