import { Box, Typography } from "@mui/material";
import type React from "react";

interface WindowProps {
  children?: React.ReactNode;
  title?: string
}

export function Window({ children, title }: WindowProps): React.JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--card-bg)',
        height: '70vh', width: '75vw', mt: 4, ml: 7,
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #000000',
        borderBottom: '2px solid #000000',
      }}
    >
      {/* Window header */}
      <Box sx={{ backgroundColor: "#000080", p: 0.7, m: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ color: "#ffffff", ml: 1 }}>{title}</Typography>
        <Typography 
          sx={{ 
            bgcolor: 'var(--card-bg)', display: 'inline-flex', width: 30, height: 25, justifyContent: 'center', alignItems: 'center',
            borderTop: '2px solid #ffffff',
            borderLeft: '2px solid #ffffff',
            borderRight: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}>
          ✕
        </Typography>
      </Box>

      <Box sx={{ m: 1 }}>{children}</Box>
    </Box>
  )
}
