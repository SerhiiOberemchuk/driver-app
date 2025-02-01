"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const filter = createFilterOptions<TrackOptionType>();

export default function VehicleOptionDialog({
  type,
}: Pick<TrackOptionType, "type">) {
  const [value, setValue] = React.useState<TrackOptionType | null>(null);
  const [open, toggleOpen] = React.useState(false);
  const [typeVehicle, setTypeVehicle] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setTypeVehicle(event.target.value);
  };

  const handleClose = () => {
    setDialogValue({
      licencePlate: "",
    });
    setTypeVehicle("");
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    licencePlate: "",
  });

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     setValue({
  //       licencePlate: dialogValue.licencePlate,
  //       type: dialogValue.type,
  //     });
  //     handleClose();
  //   };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                licencePlate: newValue,
                // type: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              licencePlate: newValue.inputValue,
              //   type: "",
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              licencePlate: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={tracksTrasgo}
        getOptionLabel={(option) => {
          // for example value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.licencePlate;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.licencePlate}
            </li>
          );
        }}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={`Choose your ${type}`} />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form
          action={(formData: FormData) => {
            console.log(formData);
          }}
        >
          <DialogTitle>Add a new vehicle</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any vehicle? Please, add it!
            </DialogContentText>
            <TextField
              name="license"
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
              label="License plate"
              type="text"
              variant="standard"
            />

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Type
              </InputLabel>
              <Select
                name="typeV"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={typeVehicle}
                onChange={handleChange}
                label="type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"track"}>Track</MenuItem>
                <MenuItem value={"trailer"}>Trailer</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
export type TrackOptionType = {
  inputValue?: string;
  licencePlate: string;
  type?: "track" | "trailer";
};

const tracksTrasgo: readonly TrackOptionType[] = [
  { licencePlate: "DV500NM", type: "track" },
  { licencePlate: "The Godfather", type: "trailer" },
];
