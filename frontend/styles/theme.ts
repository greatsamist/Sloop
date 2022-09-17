import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
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
      fontSize: "15px",
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
