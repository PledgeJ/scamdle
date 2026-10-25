import type React from "react";
import type { dataProp } from "../pages/Scam";
import { Box, Typography } from "@mui/material";

export function ScamdleRow({ name, info }: dataProp): React.JSX.Element {
  return (
    <Box sx={{display: 'flex', width:'100%', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
      <Typography sx={{width: 200, textAlign: 'right'}}>{name}</Typography> 
      <Typography 
        sx={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
          width: 140, height: 100,
          bgcolor: info.unexpected ? 'green' : '#800000',
          color: 'white', p: 1.5, py: 4.5,
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
      >Unexpected</Typography>

      <Typography 
        sx={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
          width: 140, height: 100,
          bgcolor: info.urgency ? 'green' : '#800000',
          color: 'white', p: 1.5, py: 4.5,
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
      >Urgency</Typography>

      <Typography 
        sx={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
          width: 140, height: 100,
          bgcolor: info.impersonation ? 'green' : '#800000',
          color: 'white', p: 1.5, py: 4.5,
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
      >Impersonation</Typography>
    
      <Typography 
        sx={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          width: 140, height: 100,
          bgcolor: info.unusualPayment ? 'green' : '#800000',
          color: 'white', p: 1.5, py: 4.5,
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
      >Unusual Payment</Typography>

      <Typography 
        sx={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          width: 140, height: 100,
          bgcolor: info.toogood ? 'green' : '#800000',
          color: 'white', p: 1.5, py: 4.5,
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
      >Too good to be true</Typography>
    </Box>
  )
}
