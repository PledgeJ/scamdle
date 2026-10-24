import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Phishing } from './pages/Phishing';
import { SMS } from './pages/Sms';
import { Scam } from './pages/Scam';

import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

function App()
{
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          {/* Home */}
          <Route path='/' element={<Home/>} /> 
          {/* Phishing email */}
          <Route path='/phishing' element={<Phishing />} />
          {/* SMS sorting */}
          <Route path='/sms' element={<SMS />} />
          {/* Type of scam */}
          <Route path='/scam' element={<Scam />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
