import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface clockProps {
  size?: number
  seconds?: boolean
}

export function Clock({ size = 22, seconds = false }: clockProps): React.JSX.Element {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24h
      })

      const formattedSec = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      
      if (seconds) {
        setTime(formattedSec)
        return
      }
      setTime(formatted)
    }

    updateTime();

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  });

  return (
    <Typography sx={{ fontSize:size }}>{time}</Typography>
  )
}
