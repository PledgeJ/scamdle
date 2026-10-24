import { Box, Typography } from "@mui/material";
import type React from "react";
import { RetroButton } from "./RetroButton";

interface WindowProps {
  children?: React.ReactNode;
  title?: string;
  pink?: boolean;
  size?: {h: string | number, w: string | number};
  close?: () => void
}

export function Window({ 
  children, 
  title, 
  pink,
  size = {h: '72vh', w: '70vw'},
  close,
 }: WindowProps): React.JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--card-bg)',
        height: size.h, width: size.w, mt: 2, ml: 7,
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #000000',
        borderBottom: '2px solid #000000',
      }}
    >
      {/* Window header */}
      <Box sx={{ backgroundColor: pink ? '#c25d8e' : "#000080", p: 0.7, m: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'grab', }}>
        <Typography sx={{ color: "#ffffff", ml: 1 }}>{title}</Typography>
        <RetroButton onClick={close} height={30} width={10}>✕</RetroButton>
      </Box>

      <Box sx={{ m: 1 }}>{children}</Box>
    </Box>
  )
}
