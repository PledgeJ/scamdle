import { Typography } from "@mui/material";
import type React from "react";
import { Bars } from "../components/Bars";

export function SMS(): React.JSX.Element {
  // const [data, setData] = useState<dailyEmail | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   let isMounted = true;

  //   const loadInitialData = async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const result = await getDaily();
  //       if (isMounted) {
  //         setData(result);
  //       }
  //     } catch (err: any) {
  //       if (isMounted) {
  //         setError(err.message || 'An error occurred while loading data');
  //       }
  //     } finally {
  //       if (isMounted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   loadInitialData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [])

  // if (isLoading || error) {
  //   return (
  //     <Bars title="Phishing email">
  //       <Box sx={{ width: '100%', mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
  //         {(isLoading && !error) && <Typography>Loading...</Typography>}
  //         {error && <Typography>Error loading game: {error}</Typography>}
  //       </Box>
  //     </Bars>
  //   )
  // }

  return (
    <Bars title='SMS Sort'>
      <Typography>
        SMS
      </Typography>
    </Bars>
  )
}