import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#274596",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Inter", "sans-serif"].join(","),
    allVariants: {
      color: "#1c1e21",
    },
  },
});

export default theme;
