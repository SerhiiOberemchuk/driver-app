import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { TrackOptionType } from "./ChooseVehicle";

type Props = {
  handleSubmit: () => void;
  dialogValue: TrackOptionType;
  handleClose: () => void;
  setDialogValue: ({ type }: TrackOptionType) => void;
};

function FormAddNewVehicle({
  handleSubmit,
  dialogValue,
  handleClose,
  setDialogValue,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>Add a new film</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Did you miss any film in our list? Please, add it!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={dialogValue.licencePlate}
          onChange={(event) =>
            setDialogValue({
              ...dialogValue,
              licencePlate: event.target.value,
            })
          }
          label="title"
          type="text"
          variant="standard"
        />
        <TextField
          margin="dense"
          id="name"
          value={dialogValue.type}
          onChange={(event) =>
            setDialogValue({
              ...dialogValue,
              //   type: event.target.value,
            })
          }
          label="year"
          type="number"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </form>
  );
}

export default FormAddNewVehicle;
