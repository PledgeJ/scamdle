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

  const { user, pinkMode, setPinkMode } = useUser();

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showMain, setShowMain] = useState<boolean>(true);

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
            "sidebar header"
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
              width: 'fit-Content',
              height: 'fit-Content',
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
          display: 'flex', alignItems: 'center', justifyContent: 'right',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'transparent', border: 'none'
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem', mr: 3 }}>Scamdle</Typography>
      </Box>

      {/* Sidebar */}
      <Paper
        component="aside"
        square
        elevation={0}
        sx={{
          gridArea: 'sidebar',
          display: 'flex', gap: 1,
          borderColor: 'divider', bgcolor: 'transparent', p: 2
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <DesktopIcon 
            text="Home" 
            onClick={() => {
              if (page === '/') setShowMain(true)
              else nav('/')
            }} 
            iconPath={"/computer.png"} iconSize={{h: 90, w:90}}
          />
          <Box sx={{mb: 16}}><DesktopIcon 
            text="SMS Sort" 
            onClick={() => {
              if (page === '/sms') setShowMain(true)
              else nav('/sms')
            }} 
            iconPath={"/msn.png"} iconSize={{h: 80, w:80}}
          /></Box>
          <DesktopIcon 
            text="Email" 
            onClick={() => {
              if (page === '/phishing') setShowMain(true)
              else nav('/phishing')
            }} 
            iconPath={"/email.png"} iconSize={{h: 90, w:90}}
          /> 
          <DesktopIcon text="Super secret pink mode of joy and whimsy" onClick={() => setPinkMode(!pinkMode)} iconPath={"/book.png"} iconSize={{h: 110, w:110}}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 17, mt: 1}}>
          <DesktopIcon 
            text="Scamdle" 
            onClick={() => {
              if (page === '/scam') setShowMain(true)
              else nav('/scam')
            }} 
            iconPath={"/scamdle.png"} iconSize={{h: 80, w:80}}
          /> 

          <DesktopIcon 
            iconPath="/agent.png"
            text={user !== undefined ? 'Login':'Logout'}
            onClick={() => {
              if (showLogin) { return }
              setShowLogin(true)
            }} 
            iconSize={{h: 80, w:80}}
          />
        </Box>
      </Paper>

      {/* Main Content Area */}
      {showMain && <Draggable nodeRef={draggableNodeRef2} bounds="body" cancel=".no-drag">
        <Box
          ref={draggableNodeRef2}
          sx={{
            position: 'fixed',
            width: 'fit-Content',
            height: 'fit-Content',
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
          <Window pink={pinkMode} title={title} size={{h: size.h, w: size.w}} close={() => setShowMain(false)}><Box sx={{cursor: 'default', height: '65vh'}} className="no-drag">{children}</Box></Window>
        </Box>
      </Draggable>}

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

          {(page == '/' && showMain) && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>Welcome</Typography>
            </RetroButton>
          }

          {(page == '/sms' && showMain) && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>SMS Sort</Typography>
            </RetroButton>
          }

          {(page == '/phishing' && showMain) && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>Phishing email</Typography>
            </RetroButton>
          }

          {(page == '/scam' && showMain) && 
            <RetroButton width={250}>
              <Typography sx={{ fontSize: 22, width: '100%', textAlign: 'left' }}>Scamdle</Typography>
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