import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import classes from "./ConfirmDeleteDialog.module.css";

type Props = {
  title: string;
  handleConfirmFunc: () => void;
  openDeleteModal: boolean;
  displayDeleteModal: (value: boolean) => () => void;
};

const ConfirmDeleteDialog = ({
  title = "",
  handleConfirmFunc,
  openDeleteModal,
  displayDeleteModal,
}: Props) => {
  return (
    <div>
      <Dialog
        open={openDeleteModal}
        onClose={displayDeleteModal(false)}
        PaperProps={{ className: `dp03 ${classes.dialogContainer}` }}
      >
        <DialogTitle className={classes.dialogTitle}>
          Are you sure you want to delete {title}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogBody}>
            Do you really want to delete {title}? {"This process can't be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.dialogBtn}
            onClick={displayDeleteModal(false)}
          >
            Close
          </Button>
          <Button
            className={classes.diaglogDeleteBtn}
            onClick={handleConfirmFunc}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDeleteDialog;