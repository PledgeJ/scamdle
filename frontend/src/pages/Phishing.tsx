import { Typography } from "@mui/material";
import type React from "react";
import { Bars } from "../components/Bars";

export function Phishing(): React.JSX.Element {
  return (
    <Bars title="Phishing email">
      <Typography>
        Phishing
      </Typography>
    </Bars>
  )
}