import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xl: 1440,
      lg: 1200,
      md: 900,
      sm: 600,
      xs: 0,
    },
  },

  typography: {
    fontFamily: "Rubik",
  },
});

console.log(theme);
