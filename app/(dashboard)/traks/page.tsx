import VehicleOptionDialog from "@/app/components/ChooseVehicle";
import { Stack } from "@mui/material";
import React from "react";

type Props = {};

function TraksPage({}: Props) {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction={"row"}
      useFlexGap
      sx={{ flexWrap: "wrap", justifyContent: "space-around" }}
    >
      <VehicleOptionDialog type="track" />
      <VehicleOptionDialog type="trailer" />
    </Stack>
  );
}

export default TraksPage;
