import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Bars } from "../components/Bars";
import { useEffect, useState } from "react";
import { checkSection, getDaily, type dailyEmail, type Section, type SectionCheck } from "../services/phishing.api";
import { useUser } from "../context/UserContext";
import { requestID } from "../services/login.api";

interface Click {
  correct: boolean;
  explanation: string | null;
}

export function Phishing(): React.JSX.Element {
  const [data, setData] = useState<dailyEmail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [clicked, setClicked] = useState<Record<string, Click>>({})
  const [lastAdded, setLast] = useState<string>('')
  const [done, setDone] = useState<boolean>(false);

  const { user, setUser } = useUser();

  function createText(sections: Section[], text: string): React.ReactNode[] {
    const textChunks: React.ReactNode[] = [];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      textChunks.push(
        <Box
          key={section.id}
          component="span"
          onClick={ async () => {
            if (done || clicked[section.id]) { return }

            const res: SectionCheck = await checkSection(section.id, user)
            console.log(res)
            setClicked((prev) => ({
              ...prev,
              [section.id]: {correct: res.correct, explanation: res.explanation}
            }))

            if (res.done) {
              setDone(true);
            }

            setLast(section.id)
          }}
          sx={{
            cursor: clicked[section.id] ? 'default' : 'pointer',
            '&:hover': { backgroundColor: clicked[section.id] ? '' : 'yellow' },
            color: clicked[section.id]?.correct == true ? 'green' : clicked[section.id]?.correct == false ? 'red' : 'black'
          }}
        >
          {text.substring(section.start, section.end)}
        </Box>
      )
    }

    return textChunks
  }

  useEffect(() => {
    let isMounted = true;

    if (user != '') return

    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userRes = await requestID();
        if (isMounted) {
          setUser(userRes.id)
        }
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

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getDaily();
        if (isMounted) {
          setData(result);
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

  if (isLoading || error) {
    return (
      <Bars title="Phishing email">
        <Box sx={{ width: '100%', mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {(isLoading && !error) && <Typography>Loading...</Typography>}
          {error && <Typography>Error loading game: {error}</Typography>}
        </Box>
      </Bars>
    )
  }

  if (data === null) {
    return (
      <Bars title="Phishing email">
        <Box sx={{ width: '100%', mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography>No data...</Typography>
        </Box>
      </Bars>
    )
  }

  const chunks = createText(data.sections, data.mail)

  return (
    <Bars title="Phishing email">

      <Box
        sx={{
          boxShadow: '1px 1px 0px #808080 inset, -1px -1px 0px #ffffff inset', height: 150, px: 2, mb: 2
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.15rem',
            lineHeight: 1.6, pt: 1
          }}
        >To: You</Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.15rem',
            lineHeight: 1.6, mb: 2
          }}
        >From: {chunks[0]}</Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.6rem',
            lineHeight: 1.6, mb: 1
          }}
        >Subject: {chunks[1]}</Typography>
      </Box>
      <Box
        sx={{
          boxShadow: '1px 1px 0px #808080 inset, -1px -1px 0px #808080 inset', height: '25vh', px: 2, py: 1, bgcolor: "white"
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
          }}
        >
          {chunks.slice(2).map((chunk, index) => (
            <Fragment key={data.sections[index + 2]?.id ?? index}>
              {chunk}
            </Fragment>
          ))}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontSize: '1rem',
          lineHeight: 1.6, mt: 1, ml: 0.5
        }}
      >
        {clicked[lastAdded]?.correct === true ? 'Correct:' : clicked[lastAdded]?.correct === false ? 'Incorrect:' : 'Click the section that you think is a red flag'}{' '}
        {clicked[lastAdded]?.explanation}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: '1rem',
          lineHeight: 1.6, mt: 1, ml: 0.5
        }}
      >
        {done && "COMPLETE! Well done"}
      </Typography>
    </Bars>
  )
}
