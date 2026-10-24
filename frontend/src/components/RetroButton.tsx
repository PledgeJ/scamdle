import { Button } from "@mui/material";
import type React from "react";

interface buttonProp {
  children: React.ReactNode;
  onClick?: () => void;
  colour?: string;
  width?: number;
  height?: number;
}

export function RetroButton({
  children,
  onClick,
  colour = "#000000",
  width,
  height,
}: buttonProp): React.JSX.Element {
  return (
    <Button
      onClick={onClick}
      sx={{
        height: height,
        backgroundColor: "#c0c0c0",
        color: colour,
        fontWeight: 'bold',
        fontSize: '19px',
        borderRadius: 0,
        padding: '4px 16px',
        textTransform: 'none',
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #000000',
        borderBottom: '2px solid #000000',
        // boxShadow: '1px 1px 0px #808080 inset, -1px -1px 0px #ffffff inset',
        '&:hover': {
          backgroundColor: '#d4d4d4',
        },
        '&:active': {
          borderTop: '2px solid #000000',
          borderLeft: '2px solid #000000',
          borderRight: '2px solid #ffffff',
          borderBottom: '2px solid #ffffff',
          padding: '5px 15px 3px 17px',
        },
        width: width, minHeight: 0, minWidth: 0,
      }}
    >
      {children}
    </Button>
  )
}