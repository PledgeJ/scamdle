import { Box, Paper, Typography } from "@mui/material";
import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RetroButton } from "./RetroButton";
import { Clock } from "./Clock";
import { Window } from "./Window"

import { useUser } from '../context/UserContext'
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { DesktopIcon } from "./DesktopIcon";

interface barProps {
  title?: string;
  children?: React.ReactNode;
  size?: {h: number|string, w: number|string};
}

export function Bars({
  title,
  children,
  size = {h: '65vh', w: '70vw'},
}: barProps): React.JSX.Element {
  const nav = useNavigate();
	const page = useLocation().pathname;

  const { user, pinkMode, setPinkMode, logout } = useUser();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const draggableNodeRef1 = useRef<HTMLDivElement>(null);
  const draggableNodeRef2 = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gridTemplateRows: '100px 1fr 55px',
        gridTemplateAreas: {
          xs: `
            "header header"
            "sidebar main"
            "taskbar taskbar"
          `,
        },
        minHeight: '100vh',
        bgcolor: pinkMode ? '#edc9d7': '',
      }}
    >
      {(showLogin && page == '/') && (
        <Draggable nodeRef={draggableNodeRef1} bounds="body" cancel=".no-drag">
          <Box 
            ref={draggableNodeRef1}
            sx={{
              position: 'fixed',
              top: '20%',
              left: '35%',
              zIndex: 9999,
              cursor: 'grab',
              userSelect: 'none',
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <Window pink={pinkMode} title={"Login"} size={{ h: 350, w: 450 }} close={() => setShowLogin(false)}>
              <Box className='no-drag'>
                <Typography>This doesn't actually do anything just yet but it was too cool to get rid of, I mean its a floating window that you can open and close</Typography>
              </Box>
            </Window>
          </Box>
        </Draggable>
      )}

      {/* Header */}
      <Box
        sx={{
          gridArea: 'header',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'transparent', border: 'none'
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>Scamdle</Typography>
      </Box>

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
        <DesktopIcon text={"Test"} iconPath={"/startLogo.webp"}></DesktopIcon>
        <RetroButton onClick={() => nav('/')} width={200} ><Typography sx={{ fontSize: 22 }}>Home</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => nav('/sms')} width={200} ><Typography sx={{ fontSize: 22 }}>SMS Sort</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => nav('/phishing')} width={200} ><Typography sx={{ fontSize: 22 }}>Phishing email</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => nav('/scam')} width={200} ><Typography sx={{ fontSize: 22 }}>Find the Scam</Typography></RetroButton><br/><br/>
        <RetroButton onClick={() => setPinkMode(!pinkMode)} width={200} ><Typography sx={{ fontSize: 22 }}>PinkMode</Typography></RetroButton><br/><br/>

        {page == '/' && <RetroButton 
          onClick={() => {
            if (showLogin) { return }
            if (user !== undefined) {logout()}
            
            setShowLogin(true)
          }} 
          width={200}
        >
          <Typography sx={{ fontSize: 22 }}>{user !== undefined ? 'Login':'Logout'}</Typography>
        </RetroButton>}
      </Paper>

      {/* Main Content Area */}
      <Draggable nodeRef={draggableNodeRef2} bounds="body" cancel=".no-drag">
        <Box
          ref={draggableNodeRef2}
          sx={{
            position: 'fixed',
            top: '13%',
            left: '17%',
            zIndex: 9998,
            cursor: 'grab',
            userSelect: 'none',
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <Window pink={pinkMode} title={title} size={{h: size.h, w: size.w}}><Box sx={{cursor: 'default', height: '65vh'}} className="no-drag">{children}</Box></Window>
        </Box>
      </Draggable>

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