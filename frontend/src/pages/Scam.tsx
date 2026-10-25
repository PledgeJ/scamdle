import { Box, CircularProgress, FormControl, InputLabel, Link, MenuItem, Select, Typography, type SelectChangeEvent } from "@mui/material";
import type React from "react";
import { Bars } from "../components/Bars";
import { useState } from "react";
import { SCAMS } from "../components/scamList";
import { checkRow, type Scam } from "../services/scam.api";
import { RetroButton } from "../components/RetroButton";
import { ScamdleRow } from "../components/ScamdleRow";

export interface dataProp {
  name: string,
  info: Scam
}

export function Scam(): React.JSX.Element {
  const [selectedScam, setSelectedScam] = useState<string>('');
  const [data, setData] = useState<dataProp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [done, setDone] = useState<boolean>(false);

  const handleChange = async (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedScam(value);
  };

  const check = async() => {
    setLoading(true);
    try {
      const response = await checkRow(selectedScam)
      setData((prev) => [...prev, {name: selectedScam, info: response}]);
      if (response.correctscam) { setDone(true) }
    } catch (error) {
      console.error('Failed to fetch scam data:', error);
    } finally {
      setLoading(false);
      setSelectedScam("")
    }
  }

  return (
    <Bars title="Scamdle">
      <Box sx={{boxShadow: '1px 1px 0px #808080 inset, -1px -1px 0px #ffffff inset', height: 500, pt: 2, mb: 2, overflow: 'scroll'}}>
        {data.map((guess, i) => (
          <>
            <Box key={i} sx={{display: 'flex'}}><ScamdleRow name={guess.name} info={guess.info}/></Box>
            <br/>
          </>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}>
          <FormControl
            fullWidth
            sx={{
              width: 220,
              position: 'relative',
              zIndex: 10,
              '& .MuiInputLabel-root.Mui-focused': { color: '#000000' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#000000' },
                '&:hover fieldset': { borderColor: '#000000' },
                '&.Mui-focused fieldset': { borderColor: '#000000' },
              },
              '& .MuiInputLabel-root': { color: '#000000' },
              '& .MuiSelect-select': { color: '#000000', fontSize: 16 },
              '& .MuiSelect-icon': { color: '#000000' },
            }}
          >
            <InputLabel id="guess-label">Guess</InputLabel>
            <Select
              labelId="guess-label"
              id="guess-select"
              value={selectedScam}
              label="Guess"
              onChange={handleChange}
              MenuProps={{
                disablePortal: true,
                
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
              disabled={loading}
            >
              {SCAMS.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <RetroButton
            disabled={loading || done}
            onClick={() => check()}
            width={80}
          >
            <Typography sx={{ fontSize: 22 }}>Check</Typography>
          </RetroButton>

          {/* Loading indicator */}
          {loading && <CircularProgress size={24} sx={{ color: '#e0e0e0' }} />}
        </Box>

        <Typography>{done ? 'COMPLETE! Well done.' : ''}</Typography>

        <Typography sx={{mr: 1.5}}>Check out the different scam types at{' '}<Link href="https://www.capitalone.com/help-center/fraud-disputes/common-scam-types/">Captial One</Link></Typography>
      </Box>
    </Bars>


  )
}