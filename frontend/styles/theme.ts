import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#E5E5E5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#F30917",
      dark: "#ba000d",
      contrastText: "#fff",
    },
    text: {
      primary: "#F4F6FE",
    },
    background: {
      default: "#0F0F0F",
      paper: "#171B24",
    },
  },
  typography: {
    // htmlFontSize: 10,
    fontFamily: "Manrope",

    h2: {
      fontFamily: "Inter",
      fontSize: "23px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#fff",
      letterSpacing: "4px",
    },
    h6: {
      color: "#C4C4C4",
      fontWeight: "500",
      fontSize: "16px",
    },
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 22px = 3 * 2 + 1 * 16
          boxSizing: "content-box",
          padding: 0,
          margin: 0,
          fontSize: "1rem",
        },
      },
    },
  },
});
