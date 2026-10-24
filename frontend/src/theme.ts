import { createTheme } from '@mui/material/styles';
import './assets/fonts/fonts.css';

export const theme = createTheme({
  typography: {
    fontFamily: '"w95fa", "MS Sans Serif", Tahoma, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --text: #6b6375;
          --text-h: #08060d;
          --bg: #008080;
          --card-bg: #c0c0c0;
          --border: #e1ecf4;
          --accent: #f78166;
          --accent-bg: rgba(170, 59, 255, 0.1);
          --accent-border: rgba(170, 59, 255, 0.5);
          --shadow:
            rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

          --sans: 'w95fa', "MS Sans Serif", Tahoma, sans-serif;
          --heading: 'w95fa', "MS Sans Serif", Tahoma, sans-serif;
          --mono: ui-monospace, Consolas, monospace;

          font: 18px/145% var(--sans);
          letter-spacing: 0.18px;
          color-scheme: light dark;
          color: var(--text);
          background-color: var(--bg);
          font-synthesis: none;
          text-rendering: pixelated;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: unset;
        }

        @media (max-width: 1024px) {
          :root {
            font-size: 16px;
          }
        }

        html, body {
          margin: 0;
          padding: 0;
          background-color: var(--bg) !important;
          color: #000000;
        }

        h1 {
          font-size: 55px;
        }
      `,
    },
  },
});