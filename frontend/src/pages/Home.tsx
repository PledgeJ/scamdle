import type React from "react";
import { Bars } from "../components/Bars";
import { Box, Link, Typography } from "@mui/material";
import { Clock } from "../components/Clock";
import { useEffect, useState } from "react";
import { requestID } from "../services/login.api";
import { useUser } from "../context/UserContext";

export function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user, setUser } = useUser();

  useEffect(() => {
    if (user !== '') {
      return
    }

    let isMounted = true;
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userRes = await requestID();
        if (isMounted) {
          setUser(userRes.id)
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'An error occurred while loading data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [])

  if ((isLoading || error)) {
    return (
      <Bars title="Welcome" size={{w: 950, h: 550}}>
        <Typography>ERROR</Typography>
      </Bars>
    )
  }

  return (
     <Bars title="Welcome" size={{w: 950, h: 550}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4}}>
        <Clock size={70} seconds/>
      </Box>

      <Box sx={{mx: 2}}>
        <Typography>Welcome to Scamdle!</Typography>
        <Typography>This is a project created for HackNotts '26 (University of Nottingham Hackathon)</Typography>
        <br/>
        <Typography>On this website there is a collection of games to help people learn how to detect different kinds of scams</Typography>
        <Typography>(Open them using the desktop icons on the left)</Typography>
        <Typography>• SMS Sort: Determine which SMS texts you receive are scams or just regular messages (probably from your phone provider)</Typography>
        <Typography>• Phishing email: Inspect the phishing email and determine which parts of the email are dodgy</Typography>
        <Typography>• Find the scam: Use the information given to you to figure out what type of scam it is</Typography>
        <br/>
        <Typography>Drag the windows around (It's pretty cool and took me a second to figure out - Jacob)</Typography>
        <Typography>Try the pink mode which is definitely not there because there was an award given out by a person who likes pink</Typography>
        <br/>
        <Typography>Created by: 
          {' '}<Link href="https://github.com/PledgeJ" target="_blank" rel="noopener noreferrer">Jacob Pledge</Link>, 
          {' '}<Link href="https://github.com/dbrett07" target="_blank" rel="noopener noreferrer">Dylan Brett</Link>, and 
          {' '}<Link href="https://github.com/chinooti" target="_blank" rel="noopener noreferrer">Chinonso Oti</Link>
        </Typography>
      </Box>
     </Bars>
  )
}
