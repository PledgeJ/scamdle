import { Box, Paper, Typography } from "@mui/material";
import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RetroButton } from "./RetroButton";
import { Clock } from "./Clock";
import { Window } from "./Window"

interface barProps {
  title?: string;
  children?: React.ReactNode;
}

export function Bars({
  title,
  children,
}: barProps): React.JSX.Element {
  const nav = useNavigate();
	const page = useLocation().pathname;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { md: '240px 1fr' },
        gridTemplateRows: '100px 1fr 55px',
        gridTemplateAreas: {
          xs: `
            "header header"
            "sidebar main"
            "taskbar taskbar"
          `,
        },
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Paper
        component="header"
        square
        elevation={1}
        sx={{
          gridArea: 'header',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Typography variant="h1">Scamdle</Typography>
      </Paper>

      {/* Sidebar */}
      <Paper
        component="aside"
        square
        elevation={0}
        sx={{
          gridArea: 'sidebar',
          display: 'block',
          borderColor: 'divider', bgcolor: 'transparent', p: 2
        }}
      >
        <RetroButton onClick={() => nav('/')} width={200} ><Typography sx={{ fontSize: 22 }}>Home</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => nav('/sms')} width={200} ><Typography sx={{ fontSize: 22 }}>SMS Sort</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => nav('/phishing')} width={200} ><Typography sx={{ fontSize: 22 }}>Phishing email</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => nav('/scam')} width={200} ><Typography sx={{ fontSize: 22 }}>Find the Scam</Typography></RetroButton>
      </Paper>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          gridArea: 'main',
          p: 3,
        }}
      >
        <Window title={title}>{children}</Window>
      </Box>

      {/* Taskbar */}
      <Paper
        component="aside"
        square
        elevation={0}
        sx={{
          gridArea: 'taskbar',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          bgcolor: 'var(--card-bg)', px: 1,
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #000000',
          borderBottom: '2px solid #000000',
        }}
      >
        <Box sx={{height: 55, display: 'inline-flex', alignItems: 'center', gap: 0.7}}>
          <RetroButton width={105} >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
              <Box 
                component={'img'}
                src="/startLogo.webp"
                sx={{
                  height: 25, width: 'auto',
                  mr: 1
                }}
              />
              <Typography sx={{ fontSize: 22 }}>Start</Typography>
            </Box>
          </RetroButton><br/><br/>

          {(page == '/') && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>Welcome</Typography>
            </RetroButton>
          }

          {(page == '/' || page == '/sms') && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>SMS Sort {page == '/' && ' popup'}</Typography>
            </RetroButton>
          }

          {(page == '/' || page == '/phishing') && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>Phishing email {page == '/' && ' ad'}</Typography>
            </RetroButton>
          }

          {(page == '/' || page == '/scam') && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>Find the scam {page == '/' && ' bloat'}</Typography>
            </RetroButton>
          }
        </Box>
        
        <Box sx={{
          boxShadow: '1px 1px 0px #808080 inset, -1px -1px 0px #ffffff inset', height: 45, px: 2,
          display: 'flex', alignItems: 'center'
        }}>
          <Clock />
        </Box>

      </Paper>
    </Box>
  )
}