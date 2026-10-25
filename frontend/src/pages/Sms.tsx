import { Box, Typography } from "@mui/material";
import type React from "react";
import { Bars } from "../components/Bars";
import { getDailySMS, type dailySMS } from "../services/sms.api";
import { useEffect, useState } from "react";
import { MessageBubble } from "../components/MessageBubble";
import { RetroButton } from "../components/RetroButton";

interface RoundResult {
  userGuessText: string;
  isCorrect: boolean;
}

export function SMS(): React.JSX.Element {
  const [data, setData] = useState<dailySMS | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [level, setLevel] = useState<number>(1);
  const [history, setHistory] = useState<RoundResult[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getDailySMS();
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

  useEffect(() => {
    if (level === 2 || level === 5 || level === 8) {
      const timer = setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (level === 3 || level === 6 || level === 9) {
      const timer = setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [level]);

  if (isLoading || !data || error) {
    return (
    <Bars title="SMS Sort" size={{ h: 780, w: 600 }}>
      <Box sx={{ mt: 5, height: 620, overflowY: 'auto' }}>
          {error && <>
            <MessageBubble message={"There's been an error loading the game"} />
            <MessageBubble right message={"What's the error?"} />
            <MessageBubble message={error}/>
          </>}

          {isLoading && <>
            <MessageBubble message={"The game is taking a long time to load huh"} />
            <MessageBubble right message={"Damn, there might be something wrong with it"} />
          </>}
      </Box>

      {/*  Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <RetroButton
          onClick={() => handleGuess(true)}
          disabled
          width={200}
        >
          <Typography sx={{ fontSize: 22 }}>Scam</Typography>
        </RetroButton>

        <RetroButton
          onClick={() => handleGuess(false)}
          disabled
          width={200}
        >
          <Typography sx={{ fontSize: 22 }}>Legit</Typography>
        </RetroButton>
      </Box>
    </Bars>
  )
  }

  const handleGuess = (guessedScam: boolean) => {
    const currentIdx = Math.floor((level - 1) / 3);
    const currentItem = data.textData[currentIdx];

    if (!currentItem) return;

    const correct = currentItem.isScam === guessedScam;
    const guessText = guessedScam ? "This is a scam" : "This is legitimate";

    setHistory((prev) => {
      const nextHistory = [...prev];
      nextHistory[currentIdx] = {
        userGuessText: guessText,
        isCorrect: correct,
      };
      return nextHistory;
    });

    setLevel((prev) => prev + 1);
  };

  const isInputDisabled = level % 3 !== 1 || level > 9;

  return (
    <Bars title="SMS Sort" size={{ h: 780, w: 600 }}>
      <Box sx={{ mb: 2, height: 650, overflowY: 'auto' }}>
        
        {/* Round 1 */}
        {data.textData[0] && (
          <Box sx={{ mb: 2 }}>
            {level >= 1 && <MessageBubble message={data.textData[0].msg} />}
            {level >= 2 && history[0] && <MessageBubble right message={history[0].userGuessText} />}
            {level >= 3 && history[0] && (
              <MessageBubble
                message={(history[0].isCorrect ? "Correct!" : "Wrong!")  + ": " + data.textData[0].reason1}
              />
            )}
          </Box>
        )}

        {/* Round 2 */}
        {data.textData[1] && level >= 4 && (
          <Box sx={{ mb: 2 }}>
            {level >= 4 && <MessageBubble message={data.textData[1].msg} />}
            {level >= 5 && history[1] && <MessageBubble right message={history[1].userGuessText} />}
            {level >= 6 && history[1] && (
              <MessageBubble
                message={(history[1].isCorrect ? "Correct!" : "Wrong!")  + ": " + data.textData[1].reason1}
              />
            )}
          </Box>
        )}

        {/* Round 3 */}
        {data.textData[2] && level >= 7 && (
          <Box sx={{ mb: 2 }}>
            {level >= 7 && <MessageBubble message={data.textData[2].msg} />}
            {level >= 8 && history[2] && <MessageBubble right message={history[2].userGuessText} />}
            {level >= 9 && history[2] && (
              <MessageBubble
                message={(history[2].isCorrect ? "Correct!" : "Wrong!") + ": " + data.textData[0].reason1}
              />
            )}
          </Box>
        )}

        {/* Completed */}
        {level > 9 && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="h6">COMPLETE! Well done.</Typography>
          </Box>
        )}
      </Box>

      {/*  Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <RetroButton
          onClick={() => handleGuess(true)}
          disabled={isInputDisabled}
          width={200}
        >
          <Typography sx={{ fontSize: 22 }}>Scam</Typography>
        </RetroButton>

        <RetroButton
          onClick={() => handleGuess(false)}
          disabled={isInputDisabled}
          width={200}
        >
          <Typography sx={{ fontSize: 22 }}>Legit</Typography>
        </RetroButton>
      </Box>
    </Bars>
  )
}