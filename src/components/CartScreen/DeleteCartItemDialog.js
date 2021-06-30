import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import deleteCartItem from "./deleteCartItem";
import fetchCartItems from "./fetchCartItems";
import { useCartUpdate } from "../../contexts/CartContext";

const DeleteCartItemDialog = ({
  item,
  dialogOpen,
  setDialogOpen,
  updateSnackBar,
}) => {
  const updateCart = useCartUpdate();

  function handleClose() {
    setDialogOpen(false);
  }

  async function deleteItem() {
    const response = await deleteCartItem(item.cart_id);
    if (response.status) {
      const data = await fetchCartItems(item.uid);
      updateCart(data);
      updateSnackBar(true, "Item deleted from cart successfully.", "success");
      return;
    }
    updateSnackBar(true, response.message, "error");
  }

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="delete cart item"
      aria-describedby="clicking yes will delete the cart item"
    >
      <DialogTitle>{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textTransform: "capitalize" }}>
          <span style={{ color: "#333", fontWeight: "500" }}>{item.name} </span>
          will be deleted from your cart.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#898989" }}>
          cancel
        </Button>
        <Button onClick={deleteItem} style={{ color: "#D81B60" }} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCartItemDialog;
