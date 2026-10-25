import { Box, Button, Typography } from "@mui/material";
import type React from "react";

interface IconProps {
  text?: string;
  iconPath: string;
  onClick?: () => void;
  iconSize: {h: string | number, w: string | number}
}

export function DesktopIcon({
  text, iconPath, onClick, iconSize
}: IconProps): React.JSX.Element {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 100,
        padding: '4px',
        margin: '8px',
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
        fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',

        // Focus ring on keyboard navigation
        '&:focus-visible': {
          outline: '1px dotted #ffffff',
          outlineOffset: '-2px',
        },
      }}
    >
      {/* Icon Wrapper - w+h 90 originally */}
      <Box
        component={'img'}
        src={iconPath}
        sx={{
          width: iconSize.w,
          height: iconSize.h,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '4px',
          '& img, & svg': {
            width: 32,
            height: 32,
            imageRendering: 'pixelated',
          },
        }}
      />

      {/* Label Box */}
      <Box
        sx={{
          padding: '1px 3px',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: '17px',
            lineHeight: 1.2,
            color: '#000000',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Button>
  )
} 
