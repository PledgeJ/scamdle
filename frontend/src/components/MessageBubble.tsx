import React from 'react';
import { Box, Typography } from '@mui/material';
import { useUser } from '../context/UserContext';

export interface MessageBubbleProps {
  message: string;
  right?: boolean;
}

export function MessageBubble({message, right=false}: MessageBubbleProps): React.JSX.Element {
  const { pinkMode } = useUser()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: right ? 'flex-end' : 'flex-start',
        marginBottom: 1,
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: 300,
          padding: '10px 14px',
          borderRadius: right ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: pinkMode ? right ? '#53223b' : '#873E61' : right ? '#3b96f7' : '#29b34c',
          color: pinkMode ? '#ffffff' : '#000000',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
          wordBreak: 'break-word',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.45,
            whiteSpace: 'pre-wrap',
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};
