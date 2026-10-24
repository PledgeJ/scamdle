import type React from "react";
import { Bars } from "../components/Bars";
import { Typography } from "@mui/material";

export function Home(): React.JSX.Element {
  return (
     <Bars title="Welcome">
        <Typography>
          Home
        </Typography>
     </Bars>
  )
}
