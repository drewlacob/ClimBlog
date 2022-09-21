import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmDeleteDialog({ isOpen, setIsOpen, handleDelete }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ml: 3 }} id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "grey" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "red" }} onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
