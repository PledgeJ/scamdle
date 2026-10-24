import { Typography } from "@mui/material";
import type React from "react";
import { Bars } from "../components/Bars";

export function SMS(): React.JSX.Element {
  return (
    <Bars title='SMS Sort'>
      <Typography>
        SMS
      </Typography>
    </Bars>
  )
}